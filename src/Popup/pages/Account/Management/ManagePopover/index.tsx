import { useState } from 'react';
import type { PopoverProps } from '@mui/material';

import type { Account } from '~/types/chromeStorage';

import ChangeNameDialog from './ChangeNameDialog';
import DeleteDialog from './DeleteDialog';
import ExportMnemonicDialog from './ExportMnemonicDialog';
import ExportPrivateKeyDialog from './ExportPrivateKeyDialog';
import ManageButton from './ManageButton';
import { Container, StyledPopover } from './styled';

import Delete16Icon from '~/images/icons/Delete16.svg';
import Edit16Icon from '~/images/icons/Edit16.svg';
import Key16Icon from '~/images/icons/Key16.svg';
import Lock16Icon from '~/images/icons/Lock16.svg';

type ManagePopoverProps = Omit<PopoverProps, 'children'> & { account?: Account };

export default function ManagePopover({ account, onClose, ...remainder }: ManagePopoverProps) {
  const [isOpenedChangeNameDialog, setIsOpenedChangeNameDialog] = useState(false);
  const [isOpenedExportPrivateKeyDialog, setIsOpenedExportPrivateKeyDialog] = useState(false);
  const [isOpenedExportMnemonicDialog, setIsOpenedExportMnemonicDialog] = useState(false);
  const [isOpenedDeleteDialog, setIsOpenedDeleteDialog] = useState(false);

  if (!account) {
    return null;
  }

  return (
    <>
      <StyledPopover onClose={onClose} {...remainder}>
        <Container>
          <ManageButton
            Icon={Edit16Icon}
            onClick={() => {
              setIsOpenedChangeNameDialog(true);
              onClose?.({}, 'backdropClick');
            }}
          >
            Rename account
          </ManageButton>
          {account.type === 'MNEMONIC' && (
            <ManageButton
              Icon={Lock16Icon}
              onClick={() => {
                setIsOpenedExportMnemonicDialog(true);
                onClose?.({}, 'backdropClick');
              }}
            >
              View secret phrase
            </ManageButton>
          )}
          <ManageButton
            Icon={Key16Icon}
            onClick={() => {
              setIsOpenedExportPrivateKeyDialog(true);
              onClose?.({}, 'backdropClick');
            }}
          >
            Export private key
          </ManageButton>
          <ManageButton
            Icon={Delete16Icon}
            onClick={() => {
              setIsOpenedDeleteDialog(true);
              onClose?.({}, 'backdropClick');
            }}
          >
            Delete account
          </ManageButton>
        </Container>
      </StyledPopover>
      <ChangeNameDialog open={isOpenedChangeNameDialog} onClose={() => setIsOpenedChangeNameDialog(false)} account={account} />
      <ExportPrivateKeyDialog open={isOpenedExportPrivateKeyDialog} onClose={() => setIsOpenedExportPrivateKeyDialog(false)} account={account} />
      <ExportMnemonicDialog open={isOpenedExportMnemonicDialog} onClose={() => setIsOpenedExportMnemonicDialog(false)} account={account} />
      <DeleteDialog open={isOpenedDeleteDialog} onClose={() => setIsOpenedDeleteDialog(false)} account={account} />
    </>
  );
}
