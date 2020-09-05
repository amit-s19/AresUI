import React, { Fragment, useState } from 'react';
import Message from './Message';
import Progress from './Progress';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import axios from 'axios';
import './FileUpload.css';

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginLeft: theme.spacing(0),
    marginBottom: theme.spacing(3),
    width: '100%',
  },
}));

const FileUpload = (props) => {
  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Choose File');
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState('');
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [project, setProject] = React.useState('');
  const [dtype, setDtype] = React.useState('');
  const classes = useStyles();

  const onChange = e => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  const handleChange1 = (event) => {
    setProject(event.target.value);
  };

  const handleChange2 = (event) => {
    setDtype(event.target.value);
  };

  const onSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    formData.append('project', project);
    formData.append('dtype', dtype);

    console.log('formdata: ', formData);

    try {
      const res = await axios.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: progressEvent => {
          setUploadPercentage(
            parseInt(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            )
          );

          // Clear percentage
        }
      });

      const { fileName, filePath } = res.data;

      setUploadedFile({ fileName, filePath });    

      setMessage('File Uploaded');
    } catch (err) {
      if (err.response.status === 500) {
        setMessage('There was a problem with the server');
      } else {
        setMessage(err.response.data.msg);
      }
    }
  };

   
  
  return (
    <Fragment>
      
      <form onSubmit={onSubmit}>
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">Project type</InputLabel>
          <Select
            fullWidth
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={project}
            onChange={handleChange1}
          >
            <MenuItem value='automatic-plate-detection'>Automatic number plate detection</MenuItem>
            <MenuItem value='face-detection'>Face Detection</MenuItem>
            <MenuItem value='social-distance'>Social Distance</MenuItem>
            <MenuItem value='car-classification'>Car Classification</MenuItem>
            <MenuItem value='litter-nonlitter'>Litter Vs Non Litter Detection</MenuItem>
            <MenuItem value='object-detection'>Object Detection</MenuItem>
            
          </Select>
        </FormControl>

        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">Data Format</InputLabel>
          <Select
            fullWidth
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={dtype}
            onChange={handleChange2}
          >
            <MenuItem value='image'>Image Data</MenuItem>
            <MenuItem value='video'>Video Data</MenuItem>            
          </Select>
        </FormControl>
       
        <div className='custom-file mb-4'>
          <input
            type='file'
            className='custom-file-input'
            id='customFile'
            onChange={onChange}
          />
          <label className='custom-file-label' htmlFor='customFile'>
            {filename}
          </label>
        </div>


        <input
          type='submit'
          value='Upload'
          className='btn btn-primary btn-block mt-4'
        />
      </form>

      <div className="progres-bar">
        <Progress percentage={uploadPercentage} />
      </div>
      {/* {message ? <Message msg={message} /> : null} */}
 
    </Fragment>
  );
};


export default FileUpload;


/*
Develop an activity diagram based on the following narrative.  The purpose of the Open Access
Insurance System is to provide automotive insurance to car owners.  Initially, prospective customers
fill out an insurance application, which provides information about the customer and his or her vehicles.
This information is sent to an agent, who sends it to various insurance companies to get quotes for
insurance.  When the responses return, the agent then determines the best policy for the type and
 level of coverage desired and gives the customer a copy of the insurance policy proposal and quote.  
*/


/*
     {uploadedFile ? (
      <div className='row mt-5'>
        <div className='col-md-6 m-auto'>
          <img style={{maxWidth:500, maxHeight:300 }} src={uploadedFile.filePath} alt='' />
        </div>
      </div>
      ) : null}


*/