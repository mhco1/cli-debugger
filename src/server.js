{
    process.title = `_node_runtime_${process.env.NAME}`

    const inspector = (await import('node:inspector')).default;
    const { Session } = (await import('node:inspector/promises')).default;

    const session = new Session();
    const url = inspector.url();
    const _exe = {
        eval: async ({ script }) =>
            await session.post('Runtime.evaluate', {
                expression: script,
            }),
        props: async ({ id }) =>
            await session.post('Runtime.getProperties', {
                objectId: id, ownProperties: true,
            }),
    };

    process.on('message', ({ exe, id, data }) => {
        (async () => await _exe[exe](data))()
            .then(res => process.send({ id, res }))
            .catch(err => process.send({ id, err }))
    });

    session.connect();
}