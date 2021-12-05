import React, {ButtonHTMLAttributes} from 'react';
import styled from 'styled-components';
import { animated } from 'react-spring';
/*import {
  getStatusBarHeight,
  getBottomSpace,
} from 'react-native-iphone-x-helper';
import { FlatList } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Provider } from '.';*/

interface ProviderContainerProps {
  selected: boolean;
}

interface ProviderNameProps {
  selected: boolean;
}

interface HourProps {
  available: boolean;
  selected: boolean;
}

interface HourTextProps {
  selected: boolean;
}

export const Container = styled.div``;

export const Header = styled.div`
  padding: 24px;
  background: #28262e;
  flex-direction: row;
  align-items: center;
`;

export const HeaderTitle = styled.text`
  color: #f4ede8;
  font-size: 20px;
  font-family: 'RobotoSlab-Medium';
  line-height: 28px;
  margin-left: 16px;
`;

export const UserAvatar = styled.div`
  img {
    width: 56px;
    height: 56px;
    border-radius: 28px;
    margin-left: auto;
  }
`;

export const ProvidersListContainer = styled.div`
  height: 112px;
`;

export const ProvidersList = styled.div``;

export const ProviderContainer = styled(animated.div)<ProviderContainerProps>`
  flex-direction: row;
  align-items: center;
  padding: 8px 12px;
  margin-right: 16px;
  background: ${(props) => (props.selected ? '#FF9000' : '#3e3b47')};
  border-radius: 10px;
`;

export const ProviderAvatar = styled.div`
img {
  width: 32px;
  height: 32px;
  border-radius: 36px;
}
`;

export const ProviderName = styled.text<ProviderNameProps>`
  font-family: 'RobotoSlab-Medium';
  font-size: 16px;
  margin-left: 8px;
  color: ${(props) => (props.selected ? '#232129' : '#f4ede8')};
`;

export const Calendar = styled.aside``;

export const Title = styled.text`
  font-family: 'RobotoSlab-Medium';
  color: #f4ede8;
  font-size: 24px;
  margin: 0 24px 24px;
`;

export const Schedule = styled.div`
  padding: 24px 0 16px;
`;

export const Section = styled.section`
  margin-bottom: 24px;
`;

export const SectionTitle = styled.text`
  font-size: 18px;
  color: #999591;
  font-family: 'RobotoSlab-Regular';
  margin: 0 24px 12px;
`;

export const SectionContent = styled.section``;

export const Hour = styled(animated.div).attrs((props: HourProps) => ({
  enabled: props.available,
}))<HourProps>`
  padding: 12px;
  background: ${(props) => (props.selected ? '#FF9000' : '#3e3b47')};
  border-radius: 10px;
  margin-right: 8px;
  opacity: ${(props) => (props.available ? 1 : 0.3)};
`;

export const HourText = styled.text<HourTextProps>`
  color: ${(props) => (props.selected ? '#232129' : '#f4ede8')};
  font-family: 'RobotoSlab-Regular';
  font-size: 18px;
`;

export const CreateAppointmentButton = styled(animated.div)`
  background: #ff9000;
  border-radius: 10px;
  height: 50px;
  margin: 0 24px 24px;
  justify-content: center;
  align-items: center;
`;

export const CreateAppointmentButtonText = styled.text`
  color: #312e38;
  font-size: 18px;
  font-family: 'RobotoSlab-Medium';
`;