import * as React from 'react';
import {Box} from '@twilio-paste/box';
import {AnchorProps, AnchorPropTypes} from './types';

const InverseAnchor = React.forwardRef<HTMLAnchorElement, AnchorProps>((props, ref) => (
  <Box
    {...props}
    as="a"
    color="colorTextInverse"
    fontSize="inherit"
    fontWeight="inherit"
    lineHeight="inherit"
    outline="none"
    ref={ref}
    textDecoration="underline"
    _active={{
      color: 'colorTextInverseWeaker',
      textDecoration: 'none',
    }}
    _focus={{
      boxShadow: 'shadowFocusInverse',
      color: 'colorTextInverseWeaker',
      textDecoration: 'none',
    }}
    _hover={{
      color: 'colorTextInverseWeaker',
      textDecoration: 'none',
    }}
  >
    {props.children}
  </Box>
));

InverseAnchor.displayName = 'InverseAnchor';

if (process.env.NODE_ENV === 'development') {
  InverseAnchor.propTypes = AnchorPropTypes;
}

export {InverseAnchor};
