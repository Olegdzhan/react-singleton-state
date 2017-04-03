## v1.0.1 [Unreleased]
1. Add CHANGELOG.md
2. Add __sample app__
3. New webpack configurations
4. Additional files and directories in package.json _files_

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