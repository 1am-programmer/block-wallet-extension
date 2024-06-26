import { styled } from '@mui/material/styles';

export const Container = styled('div')({
  position: 'relative',

  height: '100%',
});

export const ContentContainer = styled('div')({
  height: 'calc(100% - 16.8rem)',

  padding: '2rem 1.6rem 0',
});

export const TitleContainer = styled('div')(({ theme }) => ({
  color: theme.colors.text01,

  textAlign: 'center',
}));

export const WarningContainer = styled('div')(({ theme }) => ({
  marginTop: '1.6rem',

  padding: '1.2rem 1.6rem',
  display: 'flex',

  backgroundColor: theme.colors.base02,

  borderRadius: '0.8rem',
}));

export const WarningIconContainer = styled('div')(({ theme }) => ({
  '& > svg': {
    fill: theme.colors.text01,
    '& > path': {
      fill: theme.colors.text01,
    },
  },
}));

export const WarningTextContainer = styled('div')(({ theme }) => ({
  marginLeft: '0.4rem',
  wordBreak: 'break-word',
  color: theme.colors.text01,
  alignSelf: 'center',
}));

export const MessageContainer = styled('div')(({ theme }) => ({
  marginTop: '1.2rem',
  border: `0.1rem solid ${theme.colors.base03}`,
  borderRadius: '0.8rem',

  padding: '1.6rem',

  maxHeight: '31rem',

  overflow: 'auto',
}));

export const MessageTitleContainer = styled('div')(({ theme }) => ({
  color: theme.colors.text02,
}));

export const MessageContentContainer = styled('div')(({ theme }) => ({
  color: theme.colors.text01,

  wordBreak: 'break-word',

  marginTop: '0.8rem',

  padding: '0.8rem',

  backgroundColor: theme.colors.base02,
  borderRadius: '0.8rem',

  whiteSpace: 'pre-wrap',
}));

export const BottomContainer = styled('div')({
  position: 'absolute',

  bottom: '1.6rem',
  left: '1.6rem',

  width: 'calc(100% - 3.2rem)',
});

export const BottomButtonContainer = styled('div')({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  columnGap: '0.8rem',
});
