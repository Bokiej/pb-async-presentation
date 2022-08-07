public with sharing class bulbController {

    @AuraEnabled(cacheable=true)
    public static String getBulb(){
        try {
            return '{ "name": "wire", "color": "#C2185B" }';
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}
