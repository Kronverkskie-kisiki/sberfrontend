import React, { useEffect, useRef } from 'react';
import Typed from 'typed.js';
import Paragraph from 'antd/es/typography/Paragraph';
import './gigachat-message.scss';

export type GigachatMessageProps = {
  label?: string
  message?: string;
}
export const GigachatMessage: React.FC<GigachatMessageProps> = ({ label, message }) => {
  const textField = useRef<HTMLPreElement>(null);

  useEffect(() => {
    const typed = new Typed(textField.current, {
      strings: [message || ''],
      typeSpeed: 20,
      cursorChar: '',
    });

    return () => {
      typed.destroy();
    };
  }, [message]);

  return (
    <Paragraph className="sb-gigachat-message">
      {label && <p className='sb-gigachat-message__title'>{label}</p>}
      <pre className="sb-gigachat-message__paragraph" ref={textField}/>
    </Paragraph>
  );
};
