import React, { useEffect, useRef, useState } from 'react';
import { Box, Text } from 'ink';
import { EventEmitter } from 'events';
import { Input as _Input, Arrow, Menu } from '/components';

const eventToHist = new EventEmitter;

const Context = ({ name, script }) => <>
    <Box>
        <Arrow._ name={name} />
        <Text>{script}</Text>
    </Box>
</>

const useCheckValueChange = (value, callback = () => { }) => {
    const storeValue = useRef();
    const res = typeof storeValue === 'undefined' || storeValue !== 'value';
    if (res) callback();
    storeValue.current = value;
    return res;
}

export const Hist = (props) => {
    const { script, data, name } = props

    const types = {
        value: () => <>
            <Context {...props} />
            <Text color="#ffff00">{data.value}</Text>
        </>,
        error: () => <>
            <Context {...props} />
            <Text color="#ff0000">{data.value}</Text>
        </>,
        object: () => {
            // const [isContent, setIsContent] = useState(false);
            const [arm, setArm] = useState({ isContent: false, res: {} });
            const { script, data, name } = arm.res;

            useEffect(() => {
                eventToHist.on('object', res => {
                    arm.isContent = true;
                    arm.res = res;
                    setArm({ ...arm });
                    eventToHist.removeAllListeners('object');
                })
            }, [])

            return <>
                {
                    arm.isContent ?
                        <>
                            <Context {...props} />
                            <Text color="#ffff00">{data.value}</Text>
                        </> :
                        <></>
                }
            </>
        }
    }

    const Data = types[data.type];

    return <>
        <Data />
    </>
}

export const Input = (props) => {
    const Data = useRef();
    const { handles, value, stateTypeRender } = props;
    const [typeRender, setTypeRender] = stateTypeRender;
    const [handleSubmit, handleHist] = handles;
    const lastProps = handleHist.getLast();
    const { script, data, name } = lastProps;

    const _handleSubmit = async (...args) => {
        const newTypeRender = await handleSubmit(...args);
        if (typeRender !== newTypeRender) setTypeRender(
            newTypeRender in types ? newTypeRender : 'default'
        );
    }

    const types = {
        default: () => <>
            <Box>
                <Arrow._ name={name} />
                <_Input._ onSubmit={_handleSubmit} onHistory={handleHist} value={value} />
            </Box>
        </>,
        object: () => {
            const items = data.props.map(el => ({
                label: `${el.name}: ${el.value}`, value: el
            }));

            const onSubmit = (data) => {
                eventToHist.emit('object', { script, data: data[1], name });
                setTypeRender('default');
            }

            return <>
                <Menu._ items={items} onSubmit={onSubmit} />
            </>
        }
    };

    useCheckValueChange(typeRender, () => {
        Data.current = types[typeRender];
    })

    return <>
        <Data.current />
    </>
}