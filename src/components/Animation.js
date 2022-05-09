   //framer motion variants

   export const containerleftvariants = {
    hidden : {
      x:'-20vw',
      opacity : 0
    },
    visible : {
      opacity : 1,
      x : 0,
      transition : {
       ease : "easeInOut",
       duration : 0.6
        
      }
    },
  }

  export const containerlefttextvariants = {
    hidden : {
      x:'-20vw',
      opacity : 0
    },
    visible : {
      opacity : 1,
      x : 0,
      transition : {
       ease : "easeInOut",
       duration : 1,
       delay : 0.8
        
      }
    },
  }

  export const containerrightvariants = {
    hidden : {
      x:'20vw',
      opacity : 0
    },
    visible : {
      opacity : 1,
      x : 0,
      transition : {
        ease  : "easeInOut",
        
        duration : 0.6
      }
    },
  }

  export const containerrightcardvariants = {
    hidden : {
      x:'20vw',
      opacity : 0
    },
    visible : {
      opacity : 1,
      x : 0,
      transition : {
        ease  : "easeInOut",
        delay : 1.5,
        duration : 0.6
      }
    },
  }


  export const containervariants = {
    hidden : {
      x:'0vw',
      opacity : 0
    },
    visible : {
      opacity : 1,
      x : 0,
      transition : {
        ease  : "easeInOut",
        
        duration : 0.8
      }
    },
  }

  export const containerbottomvariants = {
    hidden : {
      y:'10vw',
      opacity : 0
    },
    visible : {
      opacity : 1,
      y : 0,
      transition : {
        ease  : "easeInOut",
        
        duration : 0.8
      }
    },
  }