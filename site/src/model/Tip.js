import { Whisper, Tooltip, Button } from 'rsuite';

const Tip = () => (
    <Whisper
        placement="right"
        trigger="hover"
        speaker={<Tooltip>Это подсказка</Tooltip>}
    >
        <Button>Наведите на меня</Button>
    </Whisper>
);

export default Tip;