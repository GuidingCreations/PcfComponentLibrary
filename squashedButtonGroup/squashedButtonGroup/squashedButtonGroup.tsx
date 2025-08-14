import * as React from "react";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import { memo, useEffect, useRef, useState } from "react";
import { ThemeProvider } from '@mui/material/styles';
import generateTheme from '../../styling/utils/theme-provider'
import { Config, Mode, PrimaryColor } from '../../styling/types/types';

export interface squashedBgProps {
  options: any[]
  onOptionSelect: (option: string) => void
  fullWidth?: boolean;
  isDisabled: boolean;
  useDarkMode: boolean;
  primaryColor: string;
  width?: number;
  height?: number;
  displayField: string;
  onChangedDisplayedOption : (option: any, newWidth?: number) => void | null,
  currentOption: any;
  useTestData: boolean;
  useFlexibleWidth: boolean;
  onChangeWidth?: (newWidth: number) => void;
}


const options = [
  "Copy",
  "Print",
  "Save",
  "Delete"
]


const SquashedBG = (props: squashedBgProps) => {
  const optionsList = props.useTestData ?  options : props.options.length > 0 ? props.options : [] 
  const [open, setOpen] = useState<boolean>(false);
  const anchorRef = React.useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const handleClick = () => {
    if (typeof optionsList[selectedIndex] == "string") {
      props.onOptionSelect(optionsList[selectedIndex])
    } else {
      props.onOptionSelect(optionsList[selectedIndex].Value)
    }
  };

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    index: number,
  ) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };


  useEffect(() => {
    const newOption = optionsList[selectedIndex]
    const newWidth = anchorRef?.current?.getBoundingClientRect().width;
    props.onChangedDisplayedOption(newOption, newWidth);
  }, [selectedIndex])

  const divRef = useRef<any>(null)
  const config : Config = {
    Mode: props.useDarkMode ? 'dark' : 'light',
    primaryColor: props.primaryColor as PrimaryColor
  }

  const theme = generateTheme(config);

  if (!props.currentOption && props.options.length > 0) {
    props.onChangedDisplayedOption(optionsList[selectedIndex])
  }

  return (

    <ThemeProvider theme={theme} >

      <div style={{width: props.width ? `${props.width}px` : '100%', height: props.height ? `${props.height}px` : '100%', display: 'flex'}} ref = {divRef}>
      <ButtonGroup
        variant="contained"
        ref={anchorRef}
        aria-label="Button group with a nested menu"
        sx={{width: '100%', height: '100%', boxShadow: 'none'}}
        className="flex"
        style={{width: props.useFlexibleWidth ? 'fit-content' : '100%'}}
        >
        <Button 
        
        onClick={handleClick} 
        className="flex-grow"
        disabled = {props.isDisabled}
        sx={{whiteSpace: 'nowrap'}}  
        >
            <h4 style={{width: props.useFlexibleWidth ? 'fit-content' : '100%', fontSize: '18px', overflow: 'hidden', textOverflow: 'ellipsis'}}>{props.useTestData ? optionsList[selectedIndex] : optionsList.length > 0 ? optionsList[selectedIndex][props.displayField] : ''}</h4>
          
        </Button>
        
        { optionsList.length > 1 ? (

          
          <Button
          size="small"
          aria-controls={open ? 'split-button-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          onClick={handleToggle}
          >
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M480-360 280-560h400L480-360Z"/></svg>
        </Button>
          ) : null
          }


      </ButtonGroup>
      <Popper
        sx={{ zIndex: 1, width: anchorRef.current?.getBoundingClientRect().width }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        className="popper"
        
        >
        {({ TransitionProps, placement }) => (
          <Grow
          {...TransitionProps}
          style={{
            transformOrigin:
            placement === 'bottom' ? 'center top' : 'center bottom',
          }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu" autoFocusItem>
                  {optionsList.map((option, index) => (

                    <MenuItem
                    key={index}
                    selected={index === selectedIndex}
                    onClick={(event) => handleMenuItemClick(event, index)}
                    sx={{textWrap: 'auto'}}
                    >
                      {typeof option == 'string' ? option : option[props.displayField]  }
                    </MenuItem>
                    
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
      </div>
    </ThemeProvider>
  );
}

export default memo(SquashedBG)