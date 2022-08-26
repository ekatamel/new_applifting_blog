import MDEditor from '@uiw/react-md-editor';

interface Props {
  value: string | undefined;
  setValue: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const Markdown = ({ value, setValue }: Props) => {
  return (
    <div data-color-mode="light">
      <MDEditor height={700} value={value} onChange={setValue} />
    </div>
  );
};

export default Markdown;
