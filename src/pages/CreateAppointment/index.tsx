import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';

import Icon from 'react-native-vector-icons/Feather';
import { useAuth } from '../../hooks/auth';

import {
  Container,
  Header,
  BackButton,
  HeaderTitle,
  UserAvatar,
  ProvidersListContainer,
  ProvidersList,
  ProviderContainer,
  ProviderAvatar,
  ProviderName,
} from './styles';

import api from '../../services/api';

export interface Provider {
  id: string;
  name: string;
  avatar_url: string;
}

interface RouteParams {
  providerId: string;
}

const CreateAppointment: React.FC = () => {
  const { user } = useAuth();
  const route = useRoute();
  const { goBack } = useNavigation();
  const { providerId } = route.params as RouteParams;

  const [providers, setProviders] = useState<Provider[]>([]);
  const [selectedProvider, setSelectedProvider] = useState(providerId);

  const navigateBack = useCallback(() => {
    goBack();
  }, [goBack]);

  useEffect(() => {
    api.get('providers').then((res) => {
      setProviders(res.data);
    });
  }, []);

  const handleSelectProvider = useCallback((id: string) => {
    setSelectedProvider(id);
  }, []);

  return (
    <Container>
      <Header>
        <BackButton onPress={navigateBack}>
          <Icon name="chevron-left" size={24} color="#999591" />
        </BackButton>

        <HeaderTitle>Cabeleleireiros</HeaderTitle>

        <UserAvatar source={{ uri: user.avatar_url }} />
      </Header>

      <ProvidersListContainer>
        <ProvidersList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={providers}
          keyExtractor={(provider) => provider.id}
          renderItem={({ item }) => (
            <ProviderContainer
              onPress={() => handleSelectProvider(item.id)}
              selected={item.id === selectedProvider}
            >
              <ProviderAvatar source={{ uri: item.avatar_url }} />

              <ProviderName selected={item.id === selectedProvider}>
                {item.name}
              </ProviderName>
            </ProviderContainer>
          )}
        />
      </ProvidersListContainer>
    </Container>
  );
};

export default CreateAppointment;
