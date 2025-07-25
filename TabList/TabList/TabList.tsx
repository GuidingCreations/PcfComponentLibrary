/* eslint-disable */
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PhoneIcon from '@mui/icons-material/Phone';
import Icon from './Icon';
import { Config, PrimaryColor } from "../../styling/types/types";
import generateTheme from '../../styling/utils/theme-provider'
import { TabItemProps, TabListComponentProps } from '../types';
import { ThemeProvider } from '@mui/material';

export default function TabListComponent(props: TabListComponentProps) {
  const [value, setValue] = React.useState(0);



  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    console.log("EVENT: ", event.target)
    setValue(newValue);
    console.log(data[newValue]);

    if (data[newValue].recordID) {
      console.log("UDPATING SELECTED ITEM: ", data[newValue]);
      props.updateSelectedItem(data[newValue].recordID)
    }

  };

  const theme = generateTheme({Mode: props.useDarkMode ? "dark" : "light", primaryColor: props.primaryColor as PrimaryColor})

const testItems : TabItemProps[] = 
[{
        label: "Search",
       icon: {
            d: "M80-200v-80h400v80H80Zm0-200v-80h200v80H80Zm0-200v-80h200v80H80Zm744 400L670-354q-24 17-52.5 25.5T560-320q-83 0-141.5-58.5T360-520q0-83 58.5-141.5T560-720q83 0 141.5 58.5T760-520q0 29-8.5 57.5T726-410l154 154-56 56ZM560-400q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Z",
        }
    },
    {
        label: "Home",
       icon: {
            d: "M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z",
        }
    },
    {
        label: "Add to cart",
       icon: {
            d: "M440-600v-120H320v-80h120v-120h80v120h120v80H520v120h-80ZM280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM40-800v-80h131l170 360h280l156-280h91L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68.5-39t-1.5-79l54-98-144-304H40Z",
        }
    }
]

const data = props.useTestData ? testItems : props.tabData

  return (
    <ThemeProvider theme={theme}>

    <Tabs value={value} onChange={handleChange} aria-label="icon label tabs example">
     
      {
        data.map((item, index) => (
          
          <Tab icon={<Icon 
          fill= {value == index ? theme.palette.primary.main : props.useDarkMode ? 'white' : 'black'}
          {...item.icon}
          
          />} label={item.label}key={index}/>
        ))
      }
     
    </Tabs>
      </ThemeProvider>
  );
}