import { FC } from 'react';
import { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { MuiFileInput } from "mui-file-input";
import FormData from 'form-data'
import { siApi } from '@shared/api/user-client/si-api';

const SoundCheck: FC = () => {
    const [file, setFile] = useState<File | null>(null)
    const [recognizedSpeaker, setRecognizedSpeaker] = useState<String | null>(null)
    // const [audio, setAudio] = useAudio<HTMLAudioElement | null>(null)



    const onSubmit = async (event: React.SyntheticEvent) => {
        event.preventDefault();
        let formData = new FormData();

        formData.append('file', file);

        const options = {
            headers: formData.getHeaders,
            data: formData
        }
        const resp = await siApi.predictPost(options)
        setRecognizedSpeaker(resp.data.predictions[0]?.prediction[0])
    };

    const handleChange = (value: File | null) => {
        setRecognizedSpeaker(null)
        setFile(value)
        // setAudio(URL.createObjectURL(value))
    }

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            width="400px"
            margin="36px auto auto"
        >
            <Box mb={6}>
                <Typography display="block" variant="h3" component="h4" align='center'>
                    Select file to recognize speaker
                </Typography>
            </Box>
            <form
                noValidate
                autoComplete="off"
                style={{ width: '100%' }}
                onSubmit={onSubmit}
            >
                <Box mb={2}>
                    <MuiFileInput
                        value={file}
                        placeholder="Select a file"
                        onChange={handleChange}
                    />
                </Box>
                {file && (
                    <Box mb={2}>
                        <audio
                            controls
                            src={URL.createObjectURL(file)}
                            style={{ width: '100%' }}>
                        </audio>
                    </Box>
                )}
                {recognizedSpeaker && (
                    <Box mb={2} bgcolor="#91e3bd">
                        <Typography display="block" variant="h5" component="h5" align='center'>
                            Voice of speracker: {recognizedSpeaker}
                        </Typography>
                    </Box>
                )}
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    disabled={!!(!file || recognizedSpeaker)}
                    fullWidth
                >
                    Recognize
                </Button>
            </form>
        </Box>

    );
};

export default SoundCheck