export default {
    load(Vue) {
        const requireComponent = require.context(
            // Относительный путь до каталога компонентов
            './',
            // Обрабатывать или нет подкаталоги
            false,
            // Регулярное выражение для определения файлов базовых компонентов
            /[A-Z]\w+\.(vue)$/
            );

        const result = {};

        requireComponent.keys().forEach(fileName => {
            const componentConfig = requireComponent(fileName)
            const component = componentConfig.default || component;

            // Условие глобальной регистрации - наличие тэга
            if (componentConfig.default.tag) {
                Vue.component(componentConfig.default.tag, component);
                
                result[componentConfig.default.tag] = component;
            }

        });

        return result;
    }
}