import { useMemo } from 'react';
import type { BigNumber } from 'bignumber.js';
import { Typography } from '@mui/material';

import Number from '~/Popup/components/common/Number';
import { useTokensSWR } from '~/Popup/hooks/SWR/ethereum/useTokensSWR';
import { useCoinGeckoPriceSWR } from '~/Popup/hooks/SWR/useCoinGeckoPriceSWR';
import { useChromeStorage } from '~/Popup/hooks/useChromeStorage';
import { useTranslation } from '~/Popup/hooks/useTranslation';
import { times, toDisplayDenomAmount } from '~/Popup/utils/big';
import { isEqualsIgnoringCase, shorterAddress } from '~/Popup/utils/string';

import {
  AddressContainer,
  AmountInfoContainer,
  ContentContainer,
  LabelContainer,
  LeftContainer,
  RightAmountContainer,
  RightColumnContainer,
  RightContainer,
  RightValueContainer,
  ValueContainer,
} from './styled';
import Container from '../../components/Container';
import CopyButton from '../../components/CopyButton';
import type { TxMessageProps } from '../../index';

type ApproveProps = TxMessageProps;

export default function Approve({ tx, determineTxType }: ApproveProps) {
  const { chromeStorage } = useChromeStorage();
  const coinGeckoPrice = useCoinGeckoPriceSWR();
  const tokens = useTokensSWR();
  const { t } = useTranslation();

  const { currency } = chromeStorage;

  const { to } = tx;

  const token = tokens.data.find((item) => isEqualsIgnoringCase(to, item.address));

  const price = (token?.coinGeckoId && coinGeckoPrice.data?.[token.coinGeckoId]?.[currency]) || 0;

  const tokenAddress = token?.displayDenom || shorterAddress(to, 32);
  const toAddress = (determineTxType?.erc20?.args?.[0] as undefined | string) || '';
  const amount = (determineTxType?.erc20?.args?.[1] as BigNumber | undefined)?.toString(10) || '';

  const displayAmount = useMemo(() => {
    try {
      return toDisplayDenomAmount(BigInt(amount).toString(10), token?.decimals || 0);
    } catch {
      return '0';
    }
  }, [amount, token?.decimals]);

  const value = times(displayAmount, price);

  return (
    <Container title="Approve (ERC20)">
      <ContentContainer>
        <AddressContainer>
          <LabelContainer>
            <Typography variant="h5">{t('pages.Popup.Ethereum.SignTransaction.components.TxMessage.messages.Approve.index.tokenAddress')}</Typography>
            <CopyButton text={to} />
          </LabelContainer>
          <ValueContainer>
            <Typography variant="h5">{tokenAddress}</Typography>
          </ValueContainer>
        </AddressContainer>

        <AddressContainer sx={{ marginTop: '0.8rem', marginBottom: '0.4rem' }}>
          <LabelContainer>
            <Typography variant="h5">{t('pages.Popup.Ethereum.SignTransaction.components.TxMessage.messages.Approve.index.grantedAddress')}</Typography>
            <CopyButton text={toAddress} />
          </LabelContainer>
          <ValueContainer>
            <Typography variant="h5">{shorterAddress(toAddress, 32)}</Typography>
          </ValueContainer>
        </AddressContainer>

        <AmountInfoContainer>
          <LeftContainer>
            <Typography variant="h5">{t('pages.Popup.Ethereum.SignTransaction.components.TxMessage.messages.Approve.index.amount')}</Typography>
          </LeftContainer>
          <RightContainer>
            <RightColumnContainer>
              <RightAmountContainer>
                <Number typoOfIntegers="h5n" typoOfDecimals="h7n">
                  {displayAmount}
                </Number>
                &nbsp;
                <Typography variant="h5n">{token?.displayDenom}</Typography>
              </RightAmountContainer>
              <RightValueContainer>
                {value !== '0' && (
                  <Number typoOfIntegers="h5n" typoOfDecimals="h7n" currency={currency}>
                    {value}
                  </Number>
                )}
              </RightValueContainer>
            </RightColumnContainer>
          </RightContainer>
        </AmountInfoContainer>
      </ContentContainer>
    </Container>
  );
}
