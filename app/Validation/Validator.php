<?php

namespace App\Validation;

use Respect\Validation\Validator as Respect;
use Respect\Validation\Exceptions\NestedValidationException;

class Validator {
    
    protected $errors;
    
    public function validate($request, array $rules) {
        foreach ($rules as $field => $rule) {
            try {
                $rule->setName(ucfirst($field))->assert($request->getParam($field));
            } catch (NestedValidationException $e) {
                $this->errors[$field] = $e->getMessages();
                $this->errors[$field] = $e->findMessages([
                    'notEmpty' => 'Ce champ doit être garni',
                    'noWhitespace' => 'Ce champ ne peut contenir des espaces' 
                ]);
            }
        }
        
        $_SESSION['errors'] = $this->errors;
        
        return $this;
    }
    
    public function failed() {
        return !empty($this->errors);
    }
    
    public function getErrors(){
        return $this->errors;
    }
            
}
