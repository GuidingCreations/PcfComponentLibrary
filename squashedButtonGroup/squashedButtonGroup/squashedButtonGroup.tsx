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
import { useRef } from "react";

export interface squashedBgProps {
  options: any[]
  onOptionSelect: (option: string) => void
  width: number;
  height: number;
  fullWidth?: boolean;
}


const options = [
  "Copy",
  "Print",
  "Save",
  "Delete"
]


const SquashedBG = (props: squashedBgProps) => {

  const optionsList = props.options.length ? props.options : options
  const isOpen = useRef<boolean>(false);
  const anchorRef = React.useRef<HTMLDivElement>(null);
  const selectedIndex = useRef<number>(0);
  

  const handleClick = () => {
    console.info(`You clicked ${optionsList[selectedIndex.current]}`);
    props.onOptionSelect(optionsList[selectedIndex.current])

  };

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    index: number,
  ) => {
    console.log("EVENT FROM SQUASHED BUTTON", event)
    selectedIndex.current = index;
    isOpen.current = false 
  };

  const handleToggle = () => {
    isOpen.current = !isOpen.current
  };

  const handleClose = (event: Event) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    isOpen.current = false;
  };

  const divRef = useRef<any>(null)

  return (
      <div style={{width: props.fullWidth ? '100%' : props.width}} ref = {divRef}>
      <ButtonGroup
        variant="contained"
        ref={anchorRef}
        aria-label="Button group with a nested menu"
        sx={{width: '100%', height: props.height, padding: '.5rem', boxShadow: 'none'}}
        className="flex"
      >
        <Button 
        
          onClick={handleClick} 
          className="flex-grow"
          sx={{whiteSpace: 'nowrap'}}  
        >
            {optionsList[selectedIndex.current]}
          
        </Button>
        
        <Button
          size="small"
          aria-controls={isOpen.current ? 'split-button-menu' : undefined}
          aria-expanded={isOpen.current ? 'true' : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          onClick={handleToggle}
        >
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
      <Popper
        sx={{ zIndex: 1, width: anchorRef.current?.getBoundingClientRect().width }}
        open={isOpen.current}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
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
                      key={option}
                      
                      selected={index === selectedIndex.current}
                      onClick={(event) => handleMenuItemClick(event, index)}
                    >
                      {typeof option == 'string' ? option : option.Value  }
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
      </div>
  );
}

export default SquashedBG