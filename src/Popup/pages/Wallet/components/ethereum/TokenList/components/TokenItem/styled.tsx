import { styled } from '@mui/material/styles';

import AbsoluteLoading from '~/Popup/components/AbsoluteLoading';
import IconButton from '~/Popup/components/common/IconButton';

export const StyledButton = styled('button')(({ theme }) => ({
  position: 'relative',

  backgroundColor: theme.colors.base02,
  border: 0,

  padding: '1.2rem',

  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',

  borderRadius: '0.8rem',

  cursor: 'pointer',

  '&:disabled': {
    cursor: 'default',

    '&:hover': {
      backgroundColor: theme.colors.base02,
    },
  },

  '&:hover': {
    backgroundColor: theme.colors.base03,

    '#deleteButton': {
      display: 'block',
    },
  },
}));

export const LeftContainer = styled('div')({
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',

  textAlign: 'left',
});

export const LeftImageContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  '& > img': {
    width: '2.4rem',
    height: '2.4rem',
  },
});

export const LeftTextContainer = styled('div')({
  paddingLeft: '0.8rem',

  display: 'grid',

  gridTemplateColumns: '1fr',

  rowGap: '0.3rem',
});

export const LeftTextChainContainer = styled('div')(({ theme }) => ({
  color: theme.colors.text01,
}));

export const LeftTextChainAmountContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',

  columnGap: '0.6rem',

  color: theme.colors.text02,
}));

type TextChangeRateContainerProps = {
  'data-color'?: 'red' | 'green' | 'grey';
};

export const TextChangeRateContainer = styled('div')<TextChangeRateContainerProps>(({ theme, ...props }) => ({
  color: props['data-color'] === 'red' ? theme.accentColors.red : props['data-color'] === 'green' ? theme.accentColors.green01 : theme.colors.text02,
}));

export const LeftTextErrorContainer = styled('div')(({ theme }) => ({
  color: theme.accentColors.red,
}));

export const RightContainer = styled('div')({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',

  textAlign: 'right',
});

export const RightTextContainer = styled('div')({
  display: 'grid',

  gridTemplateColumns: '1fr',

  rowGap: '0.3rem',
});

export const RightTextValueContainer = styled('div')(({ theme }) => ({
  color: theme.colors.text01,
}));

export const RightTextChangeRateContainer = styled('div')(({ theme }) => ({
  color: theme.colors.text02,
}));

export const DeleteButton = styled('div')(({ theme }) => ({
  marginLeft: '0.4rem',
  marginRight: '-1rem',
  display: 'none',

  '& > svg': {
    fill: theme.colors.base05,

    '& > path': {
      fill: theme.colors.base05,
    },
  },
}));

export const StyledAbsoluteLoading = styled(AbsoluteLoading)({
  borderRadius: '0.8rem',
});

export const RightButtonContainer = styled('div')({
  position: 'absolute',

  right: '0.6rem',
  top: 0,
  bottom: 0,

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const StyledIconButton = styled(IconButton)(({ theme }) => ({
  '& svg': {
    fill: theme.colors.base05,
    '& > path': {
      fill: theme.colors.base05,
    },
  },
}));
