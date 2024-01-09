import { PutObjectCommand, PutObjectRequest, S3Client } from '@aws-sdk/client-s3';
import { Button, CircularProgress, FormControl, InputLabel, TextField } from '@mui/material';
import * as React from 'react';
import { Controller } from 'react-hook-form';
import _ from 'lodash'
import { Music } from './create';
import { BootstrapInput } from '../../Inputs/createFilmInput';
import axios from 'axios';
interface Props {
  music: Music; 
  setMusic: any;
  control: any;
  title:string;
  field:string;
  type:string;
}

const S3Upload = (props: Props) => {
  const { music, setMusic, control, title, field, type } = props;
  const [loading, setLoading] = React.useState(false);
  return (
    <>
      <FormControl variant="standard" sx={{ width: '100%', marginTop: '10px' }}>
        <InputLabel shrink htmlFor="bootstrap-input">
          {title}
        </InputLabel>
        <BootstrapInput defaultValue={_.get(music, `${field}`)} 
        value={_.get(music, `${field}`) ? _.get(music, `${field}`).name : ''} 
        placeholder={`Chọn ${field}`} disabled id="bootstrap-input" />
        {loading ? (
          <Button variant="contained" component="label" style={{ marginTop: '10px' }}>
            <CircularProgress color="secondary" />
          </Button>
        ) : (
          <>
          <Button variant="contained" component="label" style={{ marginTop: '10px' }}>
           Upload {title}
            <Controller
              render={({ field: { onChange, onBlur, value, name, ref } }) => (
                <input
                  type="file"
                  hidden
                 accept={ field === "source" ? 'audio/mpeg, audio/*' :'image/*'}
                  onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
                    if (e.target.files) {
                      setLoading(true);           
                      const s3Client = new S3Client({
                        region: 'ap-southeast-1',
                        credentials: {
                          accessKeyId: String(process.env.REACT_APP_PUBLIC_AccessKeyId),
                          secretAccessKey: String(process.env.REACT_APP_PUBLIC_SecretAccessKey),
                        },
                      });

                      const params: PutObjectRequest = {
                        Bucket: String(process.env.REACT_APP_PUBLIC_BUCKET),
                        Key: type + "/" + e.target.files[0].name,
                        Body: e.target.files[0],
                      };
                      const command = new PutObjectCommand(params);
                      const data = await s3Client.send(command);
                      setMusic({ ...music, [field]: e.target.files[0] });
                      setLoading(false);
                      onChange(e.target.files[0]);
                    }
                  }}
                  ref={ref}
                  name={name}
                />
              )}
              name={field}
              control={control}
            />
          </Button>
              {(music.image && typeof(music.image) === "string" && field === "image") &&
              <img src={`${process.env.REACT_APP_CLOUDFRONT_URL}/images/` + music.image} 
                style={{marginTop: "20px"}}
                width={200} height={200}/>       
                }
                {(music.image && typeof(music.image) !== "string" && field === "image") &&
              <img src={`${process.env.REACT_APP_CLOUDFRONT_URL}/images/` + music.image?.name} 
                style={{marginTop: "20px"}}
                width={200} height={200}/>       
                }
                </>
        )}
      </FormControl>
    </>
  );
};

export default S3Upload;
