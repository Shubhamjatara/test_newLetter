function unpackKeys(keysArray:[]) {
    return keysArray.reduce((acc:any, obj:any) => {
      return { ...acc, ...obj };
    }, {});
  }

  export {unpackKeys}