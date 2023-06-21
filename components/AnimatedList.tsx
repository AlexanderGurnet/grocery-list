import { TransitionGroup } from 'react-transition-group';
import Collapse from '@mui/material/Collapse';

import ListItem from './ListItem';
import { IAnimatedListProps } from '../types/types';

const AnimatedList = ({ data }: IAnimatedListProps) => {
  return (
    <TransitionGroup role="list">
      {data?.map((item) => (
        <Collapse component="li" key={item.id} timeout={500}>
          <ListItem data={item} />
        </Collapse>
      ))}
    </TransitionGroup>
  );
};

export default AnimatedList;
