import React, {ButtonHTMLAttributes} from 'react';
import styled from 'styled-components';
import { animated } from 'react-spring';
/*import {
  getStatusBarHeight,
  getBottomSpace,
} from 'react-native-iphone-x-helper';*/
import { FlatList } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Cooperator } from '../AppointmentDatePicker/index';
//import FlatList from 'flatlist-react';

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

export const Container = styled.div`
`;

export const Header = styled.div`
  padding: 24px;
  background: #28262e;
  flex-direction: row;
  align-items: center;
`;

export const HeaderTitle = styled.text`
  color: #636363;
  font-size: 24px;
  font-family: 'Hanuman';
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

export const ProvidersList = styled(
  FlatList as new () => FlatList<Cooperator>,
).attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: {
    paddingVertical: 32,
    paddingHorizontal: 24,
  },
})``;

/*export const PrecedureList = styled(
  FlatList as new () => FlatList<any>,
).attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: {
    paddingVertical: 32,
    paddingHorizontal: 24,
  },
})``;*/

export const ProcedureList = styled.div`
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: {
    paddingVertical: 32,
    paddingHorizontal: 24,
}`;

export const ProcedureContainer = styled.div`
  flex-direction: row;
  align-items: center;
  padding: 8px 12px;
  margin-right: 16px;
  border-radius: 10px;
`;

export const ProcedureName = styled.text`
  font-family: 'RobotoSlab-Medium';
  font-size: 16px;
  margin-left: 8px;
`;

export const ProviderContainer = styled(animated.div)<ProviderContainerProps>`
  flex-direction: row;
  align-items: center;
  padding: 8px 12px;
  margin-right: 16px;
  background: ${(props) => (props.selected ? '#FF9000' : '#F8F4F3')};
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
  color: ${(props) => (props.selected ? '#232129' : '#523E27')};
`;

export const Calendar = styled.aside`
  padding: 24px;
`;

export const Title = styled.text`
  color: #636363;
  font-family: 'Hanuman'; 
  font-size: 24px;
  margin: 15px 30px 24px;
`;

export const Schedule = styled.div`
  padding: 24px 0 16px;
`;

export const Section = styled.section`
  margin-bottom: 24px;
`;

export const SectionTitle = styled.text`
  font-size: 18px;
  color: #636363;
  font-family: 'Hanuman';

  margin-top:15px;
`;

export const SectionContent = styled.section`
  margin-top: 10px;
`;

export const Hour = styled.button.attrs((props: HourProps) => ({
  enabled: props.available,
}))<HourProps>`
  padding: 12px;
  background: ${(props) => (props.selected ? '#FF9000' : '#F8F4F3')};
  border: 0.5px solid #F8F4F3;
  border-radius: 10px;
  margin-right: 8px;
  opacity: ${(props) => (props.available ? 1 : 0.3)};
`;

export const HourText = styled.text<HourTextProps>`
  color: ${(props) => (props.selected ? '#232129' : '#523E27')};
  font-family: 'RobotoSlab-Regular';
  font-size: 18px;
`;

export const CreateAppointmentButton = styled.button`
  background: #ff9000;
  border-radius: 10px;
  height: 50px;
  width: 150px;
  margin: 0 24px 24px;
  justify-content: center;
  align-items: center;
`;

export const CreateAppointmentButtonText = styled.text`
  color: #312e38;
  font-size: 20px;
  font-family: 'RobotoSlab-Medium';
`;

export const Content = styled.div`
margin-top: 150px;
.wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(12rem, 16rem));
  gap: 2rem;
  justify-content: center;
}

display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;

  form {
    margin: 80px 0;
    width: 340px;
    text-align: center;
    display: flex;
    flex-direction: column;

    h1 {
      margin-bottom: 24px;
      font-size: 20px;
      text-align: left;
    }
  }
`;