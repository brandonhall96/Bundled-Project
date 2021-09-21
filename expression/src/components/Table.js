import { formatDate } from '@elastic/eui';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '@elastic/eui/dist/eui_theme_amsterdam_light.css';


import {
  EuiBasicTable,
  EuiButton,
  EuiFlexGroup,
  EuiFlexItem,
  EuiFieldText,
  EuiFormRow,
} from '@elastic/eui';

const Table = () => {

    const [siteData, setSiteData] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [title, setTitle] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [date, setDate] = useState('');
    const [siteNumber, setSiteNumber] = useState('');
    const [nights, setNights] = useState('');
    const [editId, setEditId] = useState('');
    const [sortField, setSortField] = useState('title');
    const [sortDirection, setSortDirection] = useState('asc');
    
    const onTableChange = ({ page = {}, sort={} }) => {
        console.log(sorting)
    
        const { field: sortField, direction: sortDirection } = sort;
        
        setSortField(sortField);
        setSortDirection(sortDirection);
      };

      const sorting = {
        sort: {
          field: sortField,
          direction: sortDirection,
        },
      };
    
    const handleTitle = (e) => {
        setTitle(e.target.value);
        // console.log(title)
    }
    
    const handleCity = (e) => {
        setCity(e.target.value);
    
    }

    const handleState = (e) => {
        setState(e.target.value);
    }

    const handleDate = (e) => {
        setDate(e.target.value);
    }

    const handleSiteNumber = (e) => {
        setSiteNumber(e.target.value);
    }

    const handleNights = (e) => {
        setNights(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {title, city, state, date, siteNumber, nights}
        let url = 'http://localhost:8080/api/site/'
        if(editId === '') {
  
            axios.post(url, payload)
            .then( res => {
                setIsLoaded(false)
                axios.get(url)
                    .then((res) =>{
                        setSiteData(res.data.sites)
                        console.log(res.data.sites);
                        setIsLoaded(true);
                        setTitle('')
                        setCity('')
                        setState('')
                        setDate('')
                        setSiteNumber('')
                        setNights('')
                    })
        })
        }
        else {
            url = `http://localhost:8080/api/site/${editId}`
            axios.put(url, payload)
            .then( res => {
                setIsLoaded(false)
                axios.get('http://localhost:8080/api/site/')
                .then((res) =>{
                    setSiteData(res.data.sites)
                    console.log(res.data.sites);
                    setIsLoaded(true);
                    setTitle('')
                    setCity('')
                    setState('')
                    setDate('')
                    setSiteNumber('')
                    setNights('')
            })
        })
            
        }

    }

    const handleDelete = async (id) => {
        
        let url = `http://localhost:8080/api/site/${id}`
        axios.delete(url)
        .then( res => {
            let url = 'http://localhost:8080/api/site/'
            axios.get(url)
            .then((res) =>{
            setSiteData(res.data.sites)
            console.log(res.data.sites);
            setIsLoaded(true);
            
        })
            
            console.log(res)
        })

    }

    const startEdit = (item) => {
        setTitle(item.title)
        setCity(item.city)
        setState(item.state)
        setDate(item.date)
        setSiteNumber(item.siteNumber)
        setNights(item.nights)
        setEditId(item._id)

    }

  const columns = [
    {
        name: 'Actions',
        render: (item) => {
            return(
                <EuiButton
                color='primary' iconType='documentEdit' onClick={() => startEdit(item)}
                
                 />

            )
        }

    },

    {
      field: 'title',
      name: 'Title',
      sortable: true,
      truncateText: true,
      
      
    },
    {
      field: 'city',
      name: 'City',
      sortable: true,
      
    },
    
    {
      field: 'state',
      name: 'State',
      sortable: true,
   
    },
    {
      field: 'date',
      name: 'Date',
      sortable: true,
      
    },
    {
      field: 'siteNumber',
      name: 'Site Number',
      sortable: true,
      
    },
    {
      field: 'nights',
      name: 'Nights',
      sortable: true,
      
    },
    {
        name: 'Actions',
        render: (item) => {
            
            return (
                <EuiButton 
                    color='danger' iconType='trash' onClick={() => handleDelete(item._id)}
                />
            )

        }

    }
    
  ];
    useEffect(() =>{
        let url = 'http://localhost:8080/api/site/'
        axios.get(url)
        .then((res) =>{
            setSiteData(res.data.sites)
            console.log(res.data.sites);
            setIsLoaded(true);
            
        })
    }, [])
    

  return (
    <div>
        <EuiFlexGroup style={{ maxWidth: 600 }}>
            <EuiFlexItem>
            <EuiFormRow label="Title" >
                <EuiFieldText
                placeholder="Title"
                value={title}
                onChange={handleTitle}
                />
            </EuiFormRow>
            <EuiFormRow label="City" >
                <EuiFieldText
                placeholder="City"
                value={city}
                onChange={handleCity}
                />
            </EuiFormRow>
            <EuiFormRow label="State" >
                <EuiFieldText
                placeholder="State"
                value={state}
                onChange={handleState}
                />
            </EuiFormRow>
            <EuiFormRow label="Date" >
                <EuiFieldText
                placeholder="mm/dd/yyyy"
                value={date}
                onChange={handleDate}
                />
            </EuiFormRow>
            <EuiFormRow label="Site Number" >
                <EuiFieldText
                placeholder="Site Number"
                value={siteNumber}
                onChange={handleSiteNumber}
                />
            </EuiFormRow>
            <EuiFormRow label="Nights" >
                <EuiFieldText
                placeholder="Nights"
                value={nights}
                onChange={handleNights}
                />
            </EuiFormRow>
            </EuiFlexItem>

            <EuiFlexItem grow={false}>
            <EuiFormRow hasEmptyLabelSpace>
                <EuiButton type="submit" onClick={handleSubmit}>Submit</EuiButton>
            </EuiFormRow>
            </EuiFlexItem>
        </EuiFlexGroup>

   
    { isLoaded ? 
    <EuiBasicTable
      items={siteData}
      columns={columns}
      sorting={sorting}
      onChange={onTableChange}
      hasActions={true}
    
    />
    :null
}
    </div>
  );
};

export default Table;