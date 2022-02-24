import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import type { DialogProps, PopoverProps } from '@mui/material';

import Dialog from '~/Popup/components/common/Dialog';
import DialogHeader from '~/Popup/components/common/Dialog/Header';
import { useChromeStorage } from '~/Popup/hooks/useChromeStorage';
import { aesDecrypt, sha512 } from '~/Popup/utils/crypto';
import type { Account } from '~/types/chromeStorage';

import MnemonicView from './MnemonicView';
import { Container, StyledButton, StyledInput } from './styled';
import type { PasswordForm } from './useSchema';
import { useSchema } from './useSchema';

type ExportMnemonicDialogProps = Omit<DialogProps, 'children'> & { account: Account; popoverOnClose?: PopoverProps['onClose'] };

export default function ExportMnemonicDialog({ onClose, account, ...remainder }: ExportMnemonicDialogProps) {
  const { chromeStorage } = useChromeStorage();

  const { accountName, encryptedPassword } = chromeStorage;

  const [password, setPassword] = useState('');

  const [mnemonic, setMnemonic] = useState('');

  const invalidNames = [...Object.values(accountName)];
  invalidNames.splice(invalidNames.indexOf(accountName[account.id], 1));

  const { passwordForm } = useSchema({ encryptedPassword: encryptedPassword! });

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm<PasswordForm>({
    resolver: joiResolver(passwordForm),
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    shouldFocusError: true,
  });

  if (account.type !== 'MNEMONIC') {
    return null;
  }

  const submit = () => {
    setMnemonic(aesDecrypt(account.encryptedMnemonic, password));
  };

  const handleOnClose = () => {
    onClose?.({}, 'backdropClick');
    setTimeout(() => {
      reset();
      setPassword('');
      setMnemonic('');
    }, 200);
  };

  return (
    <Dialog {...remainder} onClose={handleOnClose}>
      {mnemonic ? (
        <MnemonicView mnemonic={mnemonic} onClose={handleOnClose} />
      ) : (
        <>
          <DialogHeader onClose={handleOnClose}>View Private Key</DialogHeader>
          <Container>
            <form onSubmit={handleSubmit(submit)}>
              <StyledInput
                inputProps={register('password', {
                  setValueAs: (v: string) => {
                    setPassword(v);
                    return v ? sha512(v) : '';
                  },
                })}
                type="password"
                placeholder="Please type password to confirm"
                error={!!errors.password}
                helperText={errors.password?.message}
              />
              <StyledButton type="submit" disabled={!isDirty}>
                Submit
              </StyledButton>
            </form>
          </Container>
        </>
      )}
    </Dialog>
  );
}
