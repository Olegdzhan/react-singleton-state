# v1.0.4 [2017-04-09]
1. Fix versions in Readme and Changelog

# v1.0.3 [2017-04-09]
1. Fix webpack.dev
2. Fix returning _URLS_ const - now its name is uppercase
3. Services private fields now is acceptable from _Symbol.for(<defaultValue>)_ and created automatically from static _defaultValues_
4. Library sample-app has a view with comparison of _react-singleton-state_ and _redux_ with code examples

# v1.0.2 [2017-04-04]
1. Fix bundle output
2. Replace some packages from _dependencies_ to _devDependencies_

# v1.0.1 [2017-04-04] __Output Error__
1. Add CHANGELOG.md
2. Add __sample app__
3. New webpack configurations
4. Additional files and directories in package.json _files_
5. Output npm file is bundeled now and has now need to use object-rest-spread and transform-class-properties pl
6. _Service.getClass()_ is deprecated and will be removed sinse v1.1.0

# v1.0.0 [2017-04-02]
1. Add class __Provider__ with methods:
 * _defineServices()_;
 * _defineUrls()_.
 
2. Add function __providerExporter(Provider)__.
 
3. Add class __Service__ with methods:
 * _get serviceName()_;
 * _toDefault()_;
 * _defaultAll()_;
 * _getClass(Service)_.
 
4. Add class __Component__ with methods:
 * __injectServices(arrOfServices [, InjectMerging])_;
 * __bindMethods(strMethod / arrOfMethodAndItsArguments)_;
 * _reRender(Service / Service.serviceName)_.
 
5. Add enum __InjectMerging__ with values: _BEFORE_, _AFTER_. 