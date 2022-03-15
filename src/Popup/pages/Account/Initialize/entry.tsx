import { useEffect } from 'react';
import { useResetRecoilState } from 'recoil';

import { useChromeStorage } from '~/Popup/hooks/useChromeStorage';
import { useCurrentPassword } from '~/Popup/hooks/useCurrent/useCurrentPassword';
import { useNavigate } from '~/Popup/hooks/useNavigate';
import { useTranslation } from '~/Popup/hooks/useTranslation';
import IconButton from '~/Popup/pages/Account/Initialize/components/IconButton';
import { newMnemonicAccountState } from '~/Popup/recoils/newAccount';

import { ButtonContainer, Container, LogoContainer, LogoImageContainer, LogoTextContainer } from './styled';

import Cosmostation21Icon from '~/images/icons/Cosmostation21.svg';
import CreateAccount28Icon from '~/images/icons/CreateAccount28.svg';
import Import28Icon from '~/images/icons/Import28.svg';
import Logo40Icon from '~/images/icons/Logo40.svg';

export default function Entry() {
  const { navigate } = useNavigate();
  const { t } = useTranslation();

  const resetNewAccount = useResetRecoilState(newMnemonicAccountState);

  const { setChromeStorage } = useChromeStorage();

  const { setCurrentPassword } = useCurrentPassword();

  useEffect(() => {
    resetNewAccount();

    void setChromeStorage('queues', []);
    void setChromeStorage('windowId', null);
    void setChromeStorage('accounts', []);
    void setChromeStorage('accountName', {});
    void setChromeStorage('additionalChains', []);
    void setChromeStorage('additionalEthereumNetworks', []);
    void setChromeStorage('encryptedPassword', null);
    void setChromeStorage('selectedAccountId', '');

    void setChromeStorage('allowedChainIds', ['62a8e13a-3107-40ef-ade4-58de45aa6c1f', '33c328b1-2d5f-43f1-ac88-25be1a5abf6c']);
    void setChromeStorage('allowedOrigins', []);
    void setChromeStorage('selectedChainId', '');
    void setChromeStorage('selectedEthereumNetworkId', '');
    void setChromeStorage('encryptedPassword', null);

    void setCurrentPassword(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Container>
      <LogoContainer>
        <LogoImageContainer>
          <Logo40Icon />
        </LogoImageContainer>
        <LogoTextContainer>
          <Cosmostation21Icon />
        </LogoTextContainer>
      </LogoContainer>
      <ButtonContainer>
        <IconButton Icon={CreateAccount28Icon} onClick={() => navigate('/account/initialize/new/mnemonic/step1')}>
          {t('pages.Account.Initialize.entry.createWallet')}
        </IconButton>
        <IconButton Icon={Import28Icon} onClick={() => navigate('/account/initialize/import')}>
          {t('pages.Account.Initialize.entry.importWallet')}
        </IconButton>
      </ButtonContainer>
    </Container>
  );
}