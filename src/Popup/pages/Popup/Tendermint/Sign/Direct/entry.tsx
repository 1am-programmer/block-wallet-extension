import { useState } from 'react';
import { Typography } from '@mui/material';

import { DEFAULT_GAS } from '~/constants/chain';
import { RPC_ERROR, RPC_ERROR_MESSAGE } from '~/constants/error';
import { PUBLIC_KEY_TYPE } from '~/constants/tendermint';
import Button from '~/Popup/components/common/Button';
import OutlineButton from '~/Popup/components/common/OutlineButton';
import Fee from '~/Popup/components/Fee';
import { useCurrentAccount } from '~/Popup/hooks/useCurrent/useCurrentAccount';
import { useCurrentPassword } from '~/Popup/hooks/useCurrent/useCurrentPassword';
import { useCurrentQueue } from '~/Popup/hooks/useCurrent/useCurrentQueue';
import { useTranslation } from '~/Popup/hooks/useTranslation';
import { getKeyPair } from '~/Popup/utils/common';
import { responseToWeb } from '~/Popup/utils/message';
import { decodeProtobufMessage } from '~/Popup/utils/proto';
import { signDirect } from '~/Popup/utils/tendermint';
import { cosmos } from '~/proto/cosmos.js';
import type { TendermintChain } from '~/types/chain';
import type { Queue } from '~/types/chromeStorage';
import type { TenSignDirect, TenSignDirectResponse } from '~/types/tendermint/message';
import type { SignDirectDoc } from '~/types/tendermint/proto';

import TxMessage from './components/TxMessage';
import {
  BottomButtonContainer,
  BottomContainer,
  Container,
  FeeContainer,
  MemoContainer,
  PaginationContainer,
  Tab,
  TabContainer,
  TabIndicatorContainer,
  TabPanelContainer,
  Tabs,
  TitleContainer,
} from './styled';
import Memo from '../components/Memo';
import Pagination from '../components/Pagination';
import Tx from '../components/Tx';

type EntryProps = {
  queue: Queue<TenSignDirect>;
  chain: TendermintChain;
};

export default function Entry({ queue, chain }: EntryProps) {
  const [value, setValue] = useState(0);
  const [txMsgPage, setTxMsgPage] = useState(1);
  const { deQueue } = useCurrentQueue();
  const { currentAccount } = useCurrentAccount();
  const { currentPassword } = useCurrentPassword();

  const { t } = useTranslation();

  const { message, messageId, origin } = queue;

  const {
    params: { doc, chainName, isEditFee, isEditMemo },
  } = message;

  const { auth_info_bytes, body_bytes } = doc;

  const decodedBodyBytes = cosmos.tx.v1beta1.TxBody.decode(body_bytes);
  const decodedAuthInfoBytes = cosmos.tx.v1beta1.AuthInfo.decode(auth_info_bytes);

  const { fee } = decodedAuthInfoBytes;

  const inputGas = fee?.gas_limit ? String(fee.gas_limit) : DEFAULT_GAS;
  const inputFee = fee?.amount?.find((item) => item.denom === chain.baseDenom)?.amount || '0';

  const [gas, setGas] = useState(inputGas);
  const [baseFee, setBaseFee] = useState(inputFee);
  const [memo, setMemo] = useState(decodedBodyBytes.memo || '');

  const encodedBodyBytes = cosmos.tx.v1beta1.TxBody.encode({ ...decodedBodyBytes, memo }).finish();
  const encodedAuthInfoBytes = cosmos.tx.v1beta1.AuthInfo.encode({
    ...decodedAuthInfoBytes,
    fee: { amount: [{ denom: chain.baseDenom, amount: baseFee }], gas_limit: Number(gas) },
  }).finish();

  const bodyBytes = isEditMemo ? encodedBodyBytes : doc.body_bytes;
  const authInfoBytes = isEditFee ? encodedAuthInfoBytes : doc.auth_info_bytes;

  const decodedChangedBodyBytes = cosmos.tx.v1beta1.TxBody.decode(bodyBytes);
  const decodedChangedAuthInfoBytes = cosmos.tx.v1beta1.AuthInfo.decode(authInfoBytes);

  const { messages } = decodedChangedBodyBytes;
  const msgs = messages.map((item) => decodeProtobufMessage(item));

  const tx = {
    ...doc,
    body_bytes: { ...decodedChangedBodyBytes, messages: msgs },
    auth_info_bytes: decodedChangedAuthInfoBytes,
  };

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Container>
      <TitleContainer>
        <Typography variant="h3">{chainName}</Typography>
      </TitleContainer>
      <TabContainer>
        <Tabs value={value} onChange={handleChange} textColor="inherit" variant="fullWidth" indicatorColor="primary">
          <Tab label={t('pages.Popup.Tendermint.Sign.Direct.entry.detailTab')} />
          <Tab label={t('pages.Popup.Tendermint.Sign.Direct.entry.dataTab')} />
        </Tabs>
        <TabIndicatorContainer />
      </TabContainer>
      <TabPanel value={value} index={0}>
        <TxMessage msg={msgs[txMsgPage - 1]} chain={chain} />
        {msgs.length > 1 && (
          <PaginationContainer>
            <Pagination currentPage={txMsgPage} totalPage={msgs.length} onChange={(page) => setTxMsgPage(page)} />
          </PaginationContainer>
        )}
        <MemoContainer>
          <Memo memo={memo} onChange={(m) => setMemo(m)} isEdit={isEditMemo} />
        </MemoContainer>

        {fee && (
          <FeeContainer>
            <Fee chain={chain} baseFee={baseFee} gas={gas} onChangeFee={(f) => setBaseFee(f)} onChangeGas={(g) => setGas(g)} isEdit={isEditFee} />
          </FeeContainer>
        )}
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Tx tx={tx} />
      </TabPanel>
      <BottomContainer>
        <BottomButtonContainer>
          <OutlineButton
            onClick={async () => {
              responseToWeb({
                response: {
                  error: {
                    code: RPC_ERROR.USER_REJECTED_REQUEST,
                    message: `${RPC_ERROR_MESSAGE[RPC_ERROR.USER_REJECTED_REQUEST]}`,
                  },
                },
                message,
                messageId,
                origin,
              });

              await deQueue();
            }}
          >
            {t('pages.Popup.Tendermint.Sign.Direct.entry.cancelButton')}
          </OutlineButton>
          <Button
            onClick={async () => {
              const keyPair = getKeyPair(currentAccount, chain, currentPassword);

              const signedDoc = { ...doc, body_bytes: bodyBytes, auth_info_bytes: authInfoBytes };

              const signature = signDirect(signedDoc, keyPair!.privateKey);

              const base64Signature = Buffer.from(signature).toString('base64');

              const base64PublicKey = Buffer.from(keyPair!.publicKey).toString('base64');

              const publicKeyType = PUBLIC_KEY_TYPE.SECP256K1;

              const signedDocHex = { ...doc, body_bytes: Buffer.from(bodyBytes).toString('hex'), auth_info_bytes: Buffer.from(authInfoBytes).toString('hex') };
              const pubKey = { type: publicKeyType, value: base64PublicKey };

              const result: TenSignDirectResponse = {
                signature: base64Signature,
                pub_key: pubKey,
                signed_doc: signedDocHex as unknown as SignDirectDoc,
              };

              responseToWeb({
                response: {
                  result,
                },
                message,
                messageId,
                origin,
              });

              await deQueue();
            }}
          >
            {t('pages.Popup.Tendermint.Sign.Direct.entry.confirmButton')}
          </Button>
        </BottomButtonContainer>
      </BottomContainer>
    </Container>
  );
}

type TabPanelProps = {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
};

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <TabPanelContainer role="tabpanel" hidden={value !== index} id={`full-width-tabpanel-${index}`} aria-labelledby={`full-width-tab-${index}`} {...other}>
      {value === index && children}
    </TabPanelContainer>
  );
}
