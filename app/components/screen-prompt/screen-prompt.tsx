import './screen-prompt.css';

export type ScreenPromptOptions = {
  className?: string,
  title: string,
  children: any,
  onCancel?: () => void,
  onConfirm: (() => void) | ((event: React.MouseEvent<HTMLButtonElement>) => void),
  cancelText?: any,
  confirmText: any,
  padded: boolean,
};

export const ScreenPrompt = ({
  className,
  title,
  children,
  onCancel,
  onConfirm,
  cancelText,
  confirmText,
  padded = false,
}: ScreenPromptOptions) => {
  return <section className={ ['prompt', className, padded && 'padded'].filter(Boolean).join(' ') }>
    <header className="title">
      { title }
    </header>
    <main className="options">
      { children }
    </main>
    <footer className="footer">
      { onCancel && cancelText && <button onClick={ onCancel } className="cancel">{ cancelText }</button> }
      { <button onClick={ onConfirm } className="confirm">{ confirmText }</button> }
    </footer>
  </section>;
};