import { Typography } from '@mui/material';

import customBeltImg from '~/images/etc/customBelt.png';
import Image from '~/Popup/components/common/Image';

import {
  ContentContainer,
  ContentLeftAbsoluteImageContainer,
  ContentLeftContainer,
  ContentLeftImageContainer,
  ContentLeftTextContainer,
  ContentRightImageContainer,
  StyledBottomArrow,
  StyledButton,
  StyledUpArrow,
} from './styled';

type ChainButtonProps = Omit<React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, 'children'> & {
  imgSrc?: string;
  isActive?: boolean;
  isCustom?: boolean;
  children?: string;
};

export default function ChainButton({ children, imgSrc, type = 'button', isActive = false, isCustom = false, ...remainder }: ChainButtonProps) {
  return (
    <StyledButton type={type} {...remainder}>
      <ContentContainer>
        <ContentLeftContainer>
          <ContentLeftImageContainer>
            <ContentLeftAbsoluteImageContainer>
              <Image src={imgSrc} />
            </ContentLeftAbsoluteImageContainer>
            {isCustom && (
              <ContentLeftAbsoluteImageContainer>
                <Image src={customBeltImg} />
              </ContentLeftAbsoluteImageContainer>
            )}
          </ContentLeftImageContainer>
          <ContentLeftTextContainer>
            <Typography variant="h5">{children}</Typography>
          </ContentLeftTextContainer>
        </ContentLeftContainer>
        <ContentRightImageContainer>{isActive ? <StyledUpArrow /> : <StyledBottomArrow />}</ContentRightImageContainer>
      </ContentContainer>
    </StyledButton>
  );
}
