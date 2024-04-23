export default () => ((new Date).getTime().toString().slice(-9) + Math.random().toString().slice(2).slice(-6))
