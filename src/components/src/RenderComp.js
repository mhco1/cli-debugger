import React, { useEffect, useState } from 'react';
import { Box, Text } from 'ink';
import { EventEmitter } from 'events';
import { Input as _Input, Arrow, Menu } from '/components';


const Context = ({ name, script }) => <>
    <Box>
        <Arrow._ name={name} />
        <Text>{script}</Text>
    </Box>
</>

const Default = ({ name, handles, value }) => {
    const [handleSubmit, handleHist] = handles;

    return <>
        <Box>
            <Arrow._ name={name} />
            <_Input._ onSubmit={handleSubmit} onHistory={handleHist} value={value} />
        </Box>
    </>
}

const eventToHist = new EventEmitter;

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
                    eventToHist.removeAllListeners('object');
                    setArm({ ...arm });
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
    const { handles, value } = props;
    const [handleSubmit, handleHist] = handles;
    const lastProps = handleHist.getLast();
    const { script, data, name } = lastProps;
    const Def = () => <Default {...{ name, ...props }} />;

    const types = {
        value: Def,
        error: Def,
        object: () => {
            const [isDef, setIsDef] = useState(false);

            const items = data.props.map(el => ({
                label: `${el.name}: ${el.value}`, value: el
            }));

            const onSubmit = (data) => {
                eventToHist.emit('object', { script, data: data[1], name });
                setIsDef(true);
            }

            return <>
                {
                    isDef ?
                        <Def /> :
                        <Menu._ items={items} onSubmit={onSubmit} />
                }
            </>
        }
    };

    // types.error = types.value;

    // const inputType = ['value', 'error'].includes(data.type) ? 'value' : '';
    const Data = typeof data !== 'undefined' ? types[data.type] : types.value;

    return <>
        <Data />
    </>
}