export default {
    getRoutes(components) {
        const arr = [];
        
        // Условие - наличие route у компонента
        for (let tag in components) {
            const comp = components[tag];
            
            if (comp.route) {
                const title = comp.title || comp.name;
                
                arr.push({
                    name: comp.tag,
                    path: comp.route,
                    component: comp,
                    meta: {
                        title: title
                    }
                });
            }
        }
        
        return arr;
    }
}