import { useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import { joiResolver } from '@hookform/resolvers/joi';
import type { DialogProps, PopoverProps } from '@mui/material';

import { CHAINS } from '~/constants/chain';
import Dialog from '~/Popup/components/common/Dialog';
import DialogHeader from '~/Popup/components/common/Dialog/Header';
import { useChromeStorage } from '~/Popup/hooks/useChromeStorage';
import { useTranslation } from '~/Popup/hooks/useTranslation';
import type { AddressInfo } from '~/types/chromeStorage';

import { Container, MarginTop8Div, StyledButton, StyledInput, StyledTextArea } from './styled';
import type { AddressBookForm } from './useSchema';
import { useSchema } from './useSchema';

type EditDialogProps = Omit<DialogProps, 'children'> & { addressInfo: AddressInfo; popoverOnClose?: PopoverProps['onClose'] };

export default function EditDialog({ onClose, addressInfo, ...remainder }: EditDialogProps) {
  const { chromeStorage, setChromeStorage } = useChromeStorage();
  const { enqueueSnackbar } = useSnackbar();

  const { t } = useTranslation();
  const { addressBook } = chromeStorage;
  const { address, label, memo, chainId } = addressInfo;

  const chain = CHAINS.find((item) => item.id === chainId);

  const regex = chain?.line === 'TENDERMINT' ? { prefix: chain.bech32Prefix.address, lengths: [39] } : undefined;

  const { addressBookForm } = useSchema({ regex });

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm<AddressBookForm>({
    resolver: joiResolver(addressBookForm),
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    shouldFocusError: true,
    defaultValues: { address, label, memo },
  });

  const handleOnClose = () => {
    reset();
    onClose?.({}, 'backdropClick');
  };

  const submit = async (data: AddressBookForm) => {
    const itemIndex = addressBook.findIndex((item) => item.id === addressInfo.id);

    if (itemIndex > -1) {
      const copiedAddressBook = addressBook.slice();

      copiedAddressBook.splice(itemIndex, 1, { ...addressInfo, ...data });
      await setChromeStorage('addressBook', copiedAddressBook);
      enqueueSnackbar('success');
    }

    handleOnClose();
  };

  return (
    <Dialog {...remainder} onClose={handleOnClose}>
      <DialogHeader onClose={handleOnClose}>{t('components.AddressBookItem.ManagePopover.EditDialog.index.title')}</DialogHeader>
      <Container>
        <form onSubmit={handleSubmit(submit)}>
          <div>
            <StyledInput
              inputProps={register('label')}
              placeholder={t('components.AddressBookItem.ManagePopover.EditDialog.index.labelPlaceholder')}
              error={!!errors.label}
              helperText={errors.label?.message}
            />
          </div>
          <MarginTop8Div>
            <StyledInput
              inputProps={register('address')}
              placeholder={t('components.AddressBookItem.ManagePopover.EditDialog.index.addressPlaceholder')}
              error={!!errors.address}
              helperText={errors.address?.message}
            />
          </MarginTop8Div>

          <MarginTop8Div>
            <StyledTextArea
              multiline
              inputProps={register('memo')}
              maxRows={4}
              placeholder={t('components.AddressBookItem.ManagePopover.EditDialog.index.memoPlaceholder')}
              error={!!errors.memo}
              helperText={errors.memo?.message}
            />
          </MarginTop8Div>
          <StyledButton type="submit" disabled={!isDirty}>
            {t('components.AddressBookItem.ManagePopover.EditDialog.index.submit')}
          </StyledButton>
        </form>
      </Container>
    </Dialog>
  );
}
