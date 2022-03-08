import { useMemo } from 'react';
import type { AxiosError } from 'axios';
import useSWR from 'swr';

import { useCurrentAccount } from '~/Popup/hooks/useCurrent/useCurrentAccount';
import { useInMemory } from '~/Popup/hooks/useInMemory';
import { get } from '~/Popup/utils/axios';
import { getAddress, getKeyPair } from '~/Popup/utils/common';
import { cosmosURL } from '~/Popup/utils/cosmos';
import type { CosmosChain } from '~/types/chain';
import type { AuthAccount, AuthAccountsPayload, AuthAccountValue, AuthBaseVestingAccount, AuthBaseWithStartAndPeriod } from '~/types/cosmos/account';

export function useAccountSWR(chain: CosmosChain, suspense?: boolean) {
  const { currentAccount } = useCurrentAccount();
  const { inMemory } = useInMemory();

  const keyPair = getKeyPair(currentAccount, chain, inMemory.password);
  const address = getAddress(chain, keyPair?.publicKey);

  const { getAccount } = cosmosURL(chain);

  const requestURL = getAccount(address);

  const fetcher = (fetchUrl: string) => get<AuthAccountsPayload>(fetchUrl);

  const { data, error, mutate } = useSWR<AuthAccountsPayload, AxiosError>(requestURL, fetcher, {
    refreshInterval: 0,
    revalidateOnFocus: false,
    errorRetryCount: 0,
    suspense,
    isPaused: () => !address,
  });

  const isBaseVestingAccount = (payload: AuthAccountValue | AuthBaseVestingAccount | AuthBaseWithStartAndPeriod): payload is AuthBaseVestingAccount =>
    (payload as AuthBaseVestingAccount).base_vesting_account !== undefined && (payload as AuthBaseWithStartAndPeriod).vesting_periods === undefined;

  const isBaseWithStartAndPeriod = (payload: AuthAccountValue | AuthBaseVestingAccount | AuthBaseWithStartAndPeriod): payload is AuthBaseWithStartAndPeriod =>
    (payload as AuthBaseWithStartAndPeriod).base_vesting_account !== undefined &&
    (payload as AuthBaseWithStartAndPeriod).start_time !== undefined &&
    (payload as AuthBaseWithStartAndPeriod).vesting_periods !== undefined;

  const result = useMemo(() => {
    if (data) {
      const value = data.result.value || data.result;

      if (isBaseWithStartAndPeriod(value)) {
        const vestingAccount = value.base_vesting_account;

        return {
          type: data.result.type?.split('/')[1],
          value: {
            address: vestingAccount.base_account.address,
            public_key: vestingAccount.base_account.public_key,
            account_number: vestingAccount.base_account.account_number,
            sequence: vestingAccount.base_account.sequence,
            original_vesting: vestingAccount.original_vesting,
            delegated_free: vestingAccount.delegated_free,
            delegated_vesting: vestingAccount.delegated_vesting,
            start_time: value.start_time,
            vesting_periods: value.vesting_periods,
            end_time: vestingAccount.end_time,
          },
        } as AuthAccount;
      }

      if (isBaseVestingAccount(value)) {
        const vestingAccount = value.base_vesting_account;

        return {
          type: data.result.type?.split('/')[1],
          value: {
            address: vestingAccount.base_account.address,
            public_key: vestingAccount.base_account.public_key,
            account_number: vestingAccount.base_account.account_number,
            sequence: vestingAccount.base_account.sequence,
            original_vesting: vestingAccount.original_vesting,
            delegated_free: vestingAccount.delegated_free,
            delegated_vesting: vestingAccount.delegated_vesting,
            start_time: value.start_time,
            end_time: vestingAccount.end_time,
          },
        } as AuthAccount;
      }

      if (data.result.account_number) {
        return {
          value: data.result,
          type: data.result.type?.split('/')[1],
        } as AuthAccount;
      }

      return {
        ...data.result,
        type: data.result.type?.split('/')[1],
      } as AuthAccount;
    }

    return data as unknown as AuthAccount;
  }, [data]);

  return {
    data: result,
    error,
    mutate,
  };
}
