import * as Validator from 'class-validator';

export class UserRegistrationDto{
    @Validator.IsNotEmpty()
    @Validator.IsEmail({
      allow_ip_domain:false,
      allow_utf8_local_part:true,
      require_tld:true
    })
    @Validator.Length(5,128)
    email:string;

    @Validator.IsNotEmpty()
    @Validator.IsString()
    @Validator.Length(6,128)
    password:string;

    @Validator.IsNotEmpty()
    @Validator.IsString()
    @Validator.Length(2,64)
    forename:string;

    @Validator.IsNotEmpty()
    @Validator.IsString()
    @Validator.Length(2,64)
    surename:string;

    @Validator.IsNotEmpty()
    @Validator.IsPhoneNumber(null)
    phoneNumber:string;

    @Validator.IsNotEmpty()
    @Validator.IsString()
    @Validator.Length(10,512)
    postalAddress:string;
}