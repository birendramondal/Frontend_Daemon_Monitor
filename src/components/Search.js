import React, { useState, useEffect } from 'react'




const Search = () => {
    const [input, setinput] = useState('');
    const [output, setoutput] = useState([]);
    const [data, setdata] = useState([]);
    const [status, setstatus] = useState(false);
    const [inst, setinst] = useState();
    // const host='';

    const change = (e) => {
        setinput(e.target.value);
    };



    const host = 'http://127.0.0.1:5000'


    // API HOST
    // only use when you have a valid api with json file for get req
    const getData = async () => {
        const response = await fetch('http://127.0.0.1:5000/api/show');

        const responseData = await response.json();
        const newdata = data.concat(Object.values(responseData));
        setdata(newdata);

    }
    useEffect(() => {
        getData();
    }, [])




    const submit = async () => {

        // remove this line if you are fetching data from from api
        let list = [];
        data.forEach(element => {
            if (element.daemon_name === input) {
                list.push(element);
            }
        });
        setoutput(list)
    }



    const edit = (id) => {
        let item = output.filter((element) => element.daemon_id === id);
        let state = item[0].daemon_status === 'UP' ? 'DOWN' : 'UP';
        let instance = item[0].instance === 'UP' ? 1 : 0;
        item[0].daemon_status = state;
        item[0].instance = instance;
        console.log(item[0]);
        data.forEach((element) => {
            if (element.daemon_id === item[0].daemon_id) {
                element = item[0];
            }
        })
        submit();
        setstatus(true)
    }
    const editInst = (name) => {
        let item2 = output.filter((element) => element.daemon_name === name);
        item2.forEach((element) => element.instance = inst)
        console.log(item2)
        data.forEach((element) => {
            item2.forEach((item) => {
                if (element.daemon_name === item.daemon_name) {
                    element = item;
                }
                element.instance < 1 ? element.status = 'DOWN' : element.status = 'UP';
            })
        })
        submit();
        setstatus(true)
    }

    const save = () => {
        setstatus(false);


        // only use when you have a valid api with json file for post req
        // await fetch(`API`, {
        //     method: "POST", 
        //     headers: {
        //         "Content-Type": "application/json"
        //     }
        // });

    }

    const changeInst = (e) => {
        setinst(e.target.value)
    }


    return (
        <div>
            <div className="text-gray-400 bg-sky-900 body-font">
                <div className="border-t border-gray-800">
                    <div className="container py-8 flex flex-wrap mx-auto items-center">
                        <div className="flex md:flex-nowrap mx-auto flex-wrap justify-center items-end md:justify-start">
                            <div className="relative sm:w-64 w-40 sm:mr-4 mr-2">
                                <input type="text" id="footer-field" name="footer-field" className="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:ring-2 focus:ring-indigo-900 focus:bg-transparent focus:border-indigo-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" placeholder='Enter Job Name' value={input} onChange={change} />
                            </div>
                            <button className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded" onClick={submit}>Search</button>
                        </div>
                    </div>
                </div>
            </div>
            <section className="text-gray-400 bg-gray-900 body-font" >
                {status ? <button className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded" onClick={save}>Save Changes</button> : ''}
                <div className="container px-5 py-24 mx-auto" >
                    <div className="flex flex-wrap justify-center -m-4">
                        {output.length !== 0 ? output.map((element, index) => {
                            return <div className="p-2 lg:w-1/3 mx-5" key={index}>
                                <div className={element.daemon_status === 'UP' ? 'h-full bg-lime-500 bg-opacity-50 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative' : 'h-full bg-red-500 bg-opacity-50 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative'}>
                                    <h1 className="title-font sm:text-2xl text-xl font-medium text-white mb-3">Daemon Name: {element.daemon_name}</h1>
                                    <p className="leading-relaxed mb-3 text-gray-300">Daemon Id: {element.daemon_id}</p>
                                    <p className="leading-relaxed mb-3 text-gray-300">Current Status: {element.daemon_status}</p>
                                    <p className="leading-relaxed mb-3 text-gray-300">Instances: {element.instance}</p>
                                    <div className='my-2 flex justify-center items-center'>
                                        <p className="leading-relaxed mb-3 text-gray-300">Instance</p><input type="number" id="footer-field" name="footer-field" className="w-20  mx-2 bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:ring-2 focus:ring-indigo-900 focus:bg-transparent focus:border-indigo-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" value={inst} onChange={changeInst} min={0} />
                                    </div>
                                    <button className="inline-flex my-2 mx-2 text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded" onClick={() => edit(element.daemon_id)}>
                                        {element.daemon_status === 'UP' ? 'DOWN' : 'UP'}</button><button className="inline-flex text-white my-2 mx-2 bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded" onClick={() => editInst(element.daemon_name)}>Change Instance</button>
                                </div>
                            </div>
                        }) : data?.map((element, index) => {
                            return <div className="p-2 lg:w-1/5 mx-5" key={index}>
                                <div className={element.daemon_status === 'UP' ? 'h-full bg-lime-500 bg-opacity-50 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative' : 'h-full bg-red-500 bg-opacity-50 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative'}>
                                    <h1 className="title-font sm:text-2xl text-xl font-medium text-white mb-3">Daemon Name: {element.daemon_name}</h1>
                                    <p className="leading-relaxed mb-3 text-gray-300">Daemon Id: {element.daemon_id}</p>
                                    <p className="leading-relaxed mb-3 text-gray-300">Current Status: {element.daemon_status}</p>
                                </div>
                            </div>


                        })}
                    </div>
                </div>
            </section>



        </div>
    )
}

export default Search
