import { useState } from 'react';
import { useSnackbar } from 'notistack';
import { InputAdornment, Typography } from '@mui/material';

import { COSMOS_CHAINS, ETHEREUM_CHAINS } from '~/constants/chain';
import Divider from '~/Popup/components/common/Divider';
import Image from '~/Popup/components/common/Image';
import Switch from '~/Popup/components/common/Switch';
import { useChromeStorage } from '~/Popup/hooks/useChromeStorage';
import { upperCaseFirst } from '~/Popup/utils/common';

import {
  ChainContainer,
  Container,
  DividerContainer,
  ItemContainer,
  ItemLeftContainer,
  ItemLeftImageContainer,
  ItemLeftTextContainer,
  ItemRightContainer,
  ListContainer,
  StyledInput,
  StyledSearch20Icon,
} from './styled';

export default function SelectChain() {
  const [search, setSearch] = useState('');

  const { enqueueSnackbar } = useSnackbar();

  const { addAllowedChainId, removeAllowedChainId, chromeStorage } = useChromeStorage();

  const { allowedChainIds } = chromeStorage;

  const filteredCosmosChains = search ? COSMOS_CHAINS.filter((chain) => chain.chainName.toLowerCase().indexOf(search.toLowerCase()) > -1) : COSMOS_CHAINS;
  const filteredEthereumChains = search ? ETHEREUM_CHAINS.filter((chain) => chain.chainName.toLowerCase().indexOf(search.toLowerCase()) > -1) : ETHEREUM_CHAINS;

  return (
    <Container>
      <StyledInput
        startAdornment={
          <InputAdornment position="start">
            <StyledSearch20Icon />
          </InputAdornment>
        }
        placeholder="Search chain"
        value={search}
        onChange={(event) => setSearch(event.currentTarget.value)}
      />
      <ChainContainer>
        <ListContainer>
          {filteredEthereumChains.map((chain) => (
            <Item
              key={chain.id}
              imageProps={{ alt: chain.chainName, src: chain.imageURL }}
              switchProps={{
                checked: allowedChainIds.includes(chain.id),
                onChange: async (_, checked) => {
                  if (checked) {
                    await addAllowedChainId(chain.id);
                  } else if (allowedChainIds.length < 2) {
                    enqueueSnackbar('1개 이상 선택하셔야 됩니다.', { variant: 'error' });
                  } else {
                    await removeAllowedChainId(chain.id);
                  }
                },
              }}
            >
              {chain.chainName}
            </Item>
          ))}
        </ListContainer>

        {filteredCosmosChains.length > 0 && filteredEthereumChains.length > 0 && (
          <DividerContainer>
            <Divider />
          </DividerContainer>
        )}

        <ListContainer>
          {filteredCosmosChains.map((chain) => (
            <Item
              key={chain.id}
              imageProps={{ alt: chain.chainName, src: chain.imageURL }}
              switchProps={{
                checked: allowedChainIds.includes(chain.id),
                onChange: async (_, checked) => {
                  if (checked) {
                    await addAllowedChainId(chain.id);
                  } else if (allowedChainIds.length < 2) {
                    enqueueSnackbar('1개 이상 선택하셔야 됩니다.', { variant: 'error' });
                  } else {
                    await removeAllowedChainId(chain.id);
                  }
                },
              }}
            >
              {chain.chainName}
            </Item>
          ))}
        </ListContainer>
      </ChainContainer>
    </Container>
  );
}

type ItemProps = {
  imageProps?: React.ComponentProps<typeof Image>;
  switchProps?: React.ComponentProps<typeof Switch>;
  children?: string;
};

function Item({ children, imageProps, switchProps }: ItemProps) {
  return (
    <ItemContainer>
      <ItemLeftContainer>
        <ItemLeftImageContainer>
          <Image {...imageProps} />
        </ItemLeftImageContainer>
        <ItemLeftTextContainer>
          <Typography variant="h5">{upperCaseFirst(children)}</Typography>
        </ItemLeftTextContainer>
      </ItemLeftContainer>
      <ItemRightContainer>
        <Switch {...switchProps} />
      </ItemRightContainer>
    </ItemContainer>
  );
}
