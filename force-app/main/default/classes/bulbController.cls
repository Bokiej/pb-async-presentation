public with sharing class bulbController {

    @AuraEnabled(cacheable=true)
    public static String getURL(){
        try {
            return 'www.some-url.com';
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}
