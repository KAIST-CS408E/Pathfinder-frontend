import * as React from 'react';

import Popover from '@material-ui/core/Popover';

import Checkbox from '@material-ui/core/Checkbox';

import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';

export interface IProps {
  anchor?: HTMLElement;
  data: IListItem[];
  selection: { [key: string]: boolean };
  onChange: (key: string, checked: boolean) => void;
  onClose: () => void;
}

interface IListItem {
  key: string;
  text: string;
}

type ChangeCheckboxFunc = (e: any) => void;
type BuildChangeFunc = (key: string) => ChangeCheckboxFunc;

export default class CourseLevelSelection extends React.Component<IProps> {
  public handleClose = () => {
    this.props.onClose();
  };

  public handleListItemClick: BuildChangeFunc = key => e => {
    this.props.onChange(key, e.target.checked as boolean);
  };

  public render() {
    const { anchor, data, selection } = this.props;
    return (
      <Popover
        open={Boolean(anchor)}
        anchorEl={anchor}
        onClose={this.handleClose}
        anchorOrigin={{
          horizontal: 'left',
          vertical: 'bottom',
        }}
        transformOrigin={{
          horizontal: 'left',
          vertical: 'top',
        }}
      >
        <div style={{ padding: 18 }}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Course Levels</FormLabel>
            <FormGroup>
              {data.map(d => (
                <FormControlLabel
                  key={d.key}
                  control={
                    <Checkbox
                      value={d.key}
                      onClick={this.handleListItemClick(d.key)}
                      checked={selection[d.key]}
                    />
                  }
                  label={d.text}
                />
              ))}
            </FormGroup>
          </FormControl>
        </div>
      </Popover>
    );
  }
}
