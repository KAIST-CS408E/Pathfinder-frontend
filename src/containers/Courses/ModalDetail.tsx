import * as React from 'react';
/* import {
 *   RouteComponentProps
 * } from 'react-router-dom'; */

import jss from 'jss';
import preset from 'jss-preset-default';
import { Style } from 'jss/css';

import Detail, { IProps } from './Detail';

jss.setup(preset());

interface ICssData {
  scrollStart: number;
}

const sheet = jss
  .createStyleSheet(
    {
      blur: {
        position: 'absolute',

        height: '100vh',
        top: ((data: ICssData) => data.scrollStart) as any,

        left: 0,
        right: 0,

        backgroundColor: 'rgba(0, 0, 0, 0.15)',
      } as Style,
      modal: {
        backgroundColor: 'white',

        position: 'absolute',

        height: '80vh',
        width: '70vw',

        left: '15vw',
        top: '10vh',
      },
    },
    { link: true }
  )
  .attach();

const { classes } = sheet;

const fixedScroll = jss.createStyleSheet({
  '@global body': { overflowY: 'hidden' },
});

export default class ModalDetail extends React.Component<IProps> {
  public componentDidMount() {
    if (document && document.scrollingElement) {
      sheet.update({ scrollStart: document.scrollingElement.scrollTop });
    }
    fixedScroll.attach();
  }

  public componentWillUnmount() {
    fixedScroll.detach();
  }

  public handleExit = (e: React.MouseEvent<{}>) => {
    e.stopPropagation();
    this.props.history.goBack();
  };

  public handleClickPropagation = (e: React.MouseEvent<{}>) => {
    e.stopPropagation();
  };

  public render() {
    return (
      <div className={classes.blur} onClick={this.handleExit}>
        <div className={classes.modal} onClick={this.handleClickPropagation}>
          <Detail {...this.props} />
        </div>
      </div>
    );
  }
}
