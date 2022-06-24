import { Typography } from '@mui/material';

import { toHex } from '~/Popup/utils/common';
import type { EthereumTx } from '~/types/ethereum/message';

import { Container } from './styled';

type ContainerProps = {
  tx: EthereumTx;
};

export default function Tx({ tx }: ContainerProps) {
  const modifyTx = {
    ...tx,
    nonce: tx.nonce !== undefined ? toHex(tx.nonce, { addPrefix: true }) : undefined,
    chainId: tx.chainId !== undefined ? toHex(tx.chainId, { addPrefix: true }) : undefined,
  };

  return (
    <Container>
      <Typography variant="h6">{JSON.stringify(modifyTx, null, 4)}</Typography>
    </Container>
  );
}
