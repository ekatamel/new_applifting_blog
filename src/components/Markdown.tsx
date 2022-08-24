import MDEditor from '@uiw/react-md-editor';

interface Props {
  value: string | undefined;
  setValue: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const Markdown = ({ value, setValue }: Props) => {
  return (
    <div className="container" data-color-mode="light">
      <MDEditor height={500} value={value} onChange={setValue} />
    </div>
  );
};

export default Markdown;
