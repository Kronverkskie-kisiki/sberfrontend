import React, { useEffect, useRef } from 'react';
import Typed from 'typed.js';
import Paragraph from 'antd/es/typography/Paragraph';
import './gigachat-message.scss';

export type GigachatMessageProps = {
  message?: string;
}
export const GigachatMessage: React.FC<GigachatMessageProps> = ({ message }) => {
  const textField = useRef<HTMLPreElement>(null);

  useEffect(() => {
    const typed = new Typed(textField.current, {
      strings: [message || ''],
      typeSpeed: 20,
      cursorChar: '',
    });

    return () => {
      // Destroy Typed instance during cleanup to stop animation
      typed.destroy();
    };
  }, [message]);

  return (
    <Paragraph className="sb-gigachat-message">
      <p className="sb-gigachat-message__title">Отчет гигачата:</p>
      <pre className="sb-gigachat-message__paragraph" ref={textField}/>
    </Paragraph>
  );
};
