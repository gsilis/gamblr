import './progress.css';

export type Orientation = 'horizontal' | 'vertical';

export type ProgressProps = {
  orientation?: Orientation,
  progress: number,
};

export default function Progress({ orientation = 'vertical', progress = 0 }: ProgressProps) {
  const classNames = ['progress', orientation, `progress-${progress}`];
  const remainder = 100 - progress;
  const progressStyle = { '--size': `${progress}`, '--remainder': `${remainder}` } as React.CSSProperties;

  return <div className={ classNames.join(' ') } style={ progressStyle }>
    <div className="background"></div>
    <div className="fill"></div>
    <div className="remainder"></div>
  </div>;
}