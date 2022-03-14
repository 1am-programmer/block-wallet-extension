import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import { useSetRecoilState } from 'recoil';
import { v4 as uuidv4 } from 'uuid';
import { joiResolver } from '@hookform/resolvers/joi';

import Button from '~/Popup/components/common/Button';
import IconButton from '~/Popup/components/IconButton';
import { useChromeStorage } from '~/Popup/hooks/useChromeStorage';
import { useInMemory } from '~/Popup/hooks/useInMemory';
import { useLoadingOverlay } from '~/Popup/hooks/useLoadingOverlay';
import { useNavigate } from '~/Popup/hooks/useNavigate';
import HDPathDialog from '~/Popup/pages/Account/components/HDPathDialog';
import { disposableLoadingState } from '~/Popup/recoils/loadingOverlay';
import { aesEncrypt, sha512 } from '~/Popup/utils/crypto';

import { BottomContainer, BottomSettingButtonContainer, Container, InputContainer, StyledInput48, StyledInput140 } from './styled';
import type { MnemonicForm } from './useSchema';
import { useSchema } from './useSchema';

import Setting16Icon from '~/images/icons/Setting16.svg';

export type CheckWord = {
  index: number;
  word: string;
};

export default function Entry() {
  const { navigateBack } = useNavigate();

  const [addressIndex, setAddressIndex] = useState(0);

  const [isOpenHDPathDialog, setIsOpenHDPathDialog] = useState(false);

  const setLoadingOverlay = useLoadingOverlay();

  const { enqueueSnackbar } = useSnackbar();

  const { chromeStorage, setChromeStorage } = useChromeStorage();
  const { inMemory } = useInMemory();

  const setDisposableLoading = useSetRecoilState(disposableLoadingState);

  const { mnemonicForm } = useSchema();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm<MnemonicForm>({
    resolver: joiResolver(mnemonicForm),
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    shouldFocusError: true,
  });

  const submit = async (data: MnemonicForm) => {
    setDisposableLoading(false);
    setLoadingOverlay(true);

    const mnemonicRestoreStrings = chromeStorage.accounts.filter((account) => account.type === 'MNEMONIC').map((account) => account.encryptedRestoreString);

    if (mnemonicRestoreStrings.includes(sha512(data.mnemonic))) {
      enqueueSnackbar('이미 존재하는 니모닉 입니다.', { variant: 'error' });
      setLoadingOverlay(false);
      return;
    }

    const accountId = uuidv4();

    await setChromeStorage('accounts', [
      ...chromeStorage.accounts,
      {
        id: accountId,
        type: 'MNEMONIC',
        bip44: { addressIndex: `${addressIndex}` },
        encryptedMnemonic: aesEncrypt(data.mnemonic, inMemory.password!),
        encryptedPassword: aesEncrypt(inMemory.password!, data.mnemonic),
        encryptedRestoreString: sha512(data.mnemonic),
      },
    ]);

    await setChromeStorage('accountName', { ...chromeStorage.accountName, [accountId]: data.name });

    setLoadingOverlay(false);

    reset();
    enqueueSnackbar('success creating new account');
    navigateBack();
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Container>
        <InputContainer>
          <div>
            <StyledInput48 placeholder="account name" inputProps={register('name')} error={!!errors.name} helperText={errors.name?.message} />
          </div>
          <div>
            <StyledInput140
              multiline
              minRows={6}
              placeholder={'To restore your password,\nplease enter your Cosmostation Wallet\nrecovery code (or phrase).'}
              inputProps={register('mnemonic', { setValueAs: (v: string) => v.trim() })}
              error={!!errors.mnemonic}
              helperText={errors.mnemonic?.message}
            />
          </div>
        </InputContainer>
        <BottomContainer>
          <BottomSettingButtonContainer>
            <IconButton Icon={Setting16Icon} onClick={() => setIsOpenHDPathDialog(true)}>
              HD path setting
            </IconButton>
          </BottomSettingButtonContainer>
          <Button type="submit" disabled={!isDirty}>
            Import
          </Button>
        </BottomContainer>
        <HDPathDialog
          open={isOpenHDPathDialog}
          currentAddressIndex={addressIndex}
          onSubmitHdPath={(data) => setAddressIndex(data.addressIndex)}
          onClose={() => setIsOpenHDPathDialog(false)}
        />
      </Container>
    </form>
  );
}
