(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{FQ0r:function(e,r,o){"use strict";o.r(r),o.d(r,"UserModule",function(){return ne});var i=o("ofXK"),t=o("wGJR"),s=o("7kJW"),n=o("wZkO"),a=o("MutI"),d=o("NFeN"),l=o("Xa2L"),c=o("tyNb"),b=o("eIep"),m=o("fXoL"),u=o("4Ebo"),f=o("YMi6"),p=o("DRsH"),h=o("3Pt+"),g=o("PSD3"),w=o.n(g);const v={firstName:{required:"Password is required"},lastName:{required:"Password is required"},country:{required:"Password is required"},email:{required:"Password is required"},dob:{required:"Password is required"},phone:{required:"Password is required"}};let P={firstName:"",lastName:"",country:"",email:"",dob:"",phone:""};var U=o("ZOsW");const y=["myPond"];function T(e,r){1&e&&m.Pb(0,"mat-spinner",2),2&e&&m.lc("diameter",60)}function N(e,r){if(1&e){const e=m.Vb();m.Ub(0,"div",3),m.Ub(1,"div",4),m.Ub(2,"h4"),m.Fc(3,"Your Profile Picture"),m.Tb(),m.Ub(4,"div",5),m.Ub(5,"div",6),m.Ub(6,"file-pond",7,8),m.bc("oninit",function(){return m.wc(e),m.fc().pondHandleInit()})("onaddfile",function(r){return m.wc(e),m.fc().pondHandleAddFile(r)}),m.Tb(),m.Tb(),m.Ub(8,"div",9),m.Ub(9,"button",10),m.bc("click",function(){return m.wc(e),m.fc().onUploadImage()}),m.Fc(10,"Upload Image"),m.Tb(),m.Tb(),m.Tb(),m.Tb(),m.Ub(11,"div",11),m.Ub(12,"form",12),m.bc("ngSubmit",function(){return m.wc(e),m.fc().onSubmit()}),m.Ub(13,"div",5),m.Ub(14,"div",13),m.Ub(15,"label",14),m.Fc(16,"First Name"),m.Tb(),m.Pb(17,"input",15),m.Tb(),m.Ub(18,"div",13),m.Ub(19,"label",16),m.Fc(20,"Last Name"),m.Tb(),m.Pb(21,"input",17),m.Tb(),m.Ub(22,"div",13),m.Ub(23,"label",18),m.Fc(24,"Country"),m.Tb(),m.Pb(25,"ng-select",19),m.Tb(),m.Ub(26,"div",13),m.Ub(27,"label",20),m.Fc(28,"Email Address"),m.Tb(),m.Pb(29,"input",21),m.Ub(30,"small",22),m.Fc(31,"Add your email address (janedoe@xxx.com)"),m.Tb(),m.Tb(),m.Ub(32,"div",13),m.Ub(33,"label",23),m.Fc(34,"Date of Birth"),m.Tb(),m.Pb(35,"input",24),m.Tb(),m.Ub(36,"div",13),m.Ub(37,"label",25),m.Fc(38,"Phone Number"),m.Tb(),m.Pb(39,"input",26),m.Tb(),m.Tb(),m.Tb(),m.Tb(),m.Tb()}if(2&e){const e=m.fc();m.Cb(6),m.lc("files",e.pondFiles)("options",e.pondOptions),m.Cb(3),m.lc("disabled",e.uploading),m.Cb(3),m.lc("formGroup",e.myForm),m.Cb(13),m.mc("notFoundText",e.container.countriesLoading||"No items found"),m.lc("items",e.container.countries)}}let C=(()=>{class e{constructor(e,r,o){this.fb=e,this.apiService=r,this.datePipe=o,this.errors=[],this.formErrors=P,this.uiErrors=P,this.validationMessages=v,this.uploading=!1,this.firstFile=0,this.pondFiles=[],this.pondOptions={class:"my-filepond",labelIdle:"Drop files here",acceptedFileTypes:"image/jpeg, image/png",imagePreviewHeight:100,imageCropAspectRatio:"1:1",imageResizeTargetWidth:130,imageResizeTargetHeight:130,stylePanelLayout:"compact circle",styleLoadIndicatorPosition:"center bottom",styleProgressIndicatorPosition:"right bottom",styleButtonRemoveItemPosition:"left bottom",styleButtonProcessItemPosition:"right bottom"},this.container={countries:[{code:"NG",name:"Nigeria"}],countriesLoading:"Loading countries, please wait"}}ngOnInit(){this.loading=!0,this.apiService.get("/customers/profile/fetch").subscribe(e=>{this.loading=!1;const r=e.data,o=new Date(r.dob);this.myForm=this.fb.group({firstName:[{value:r.firstName,disabled:!0},[h.s.required]],lastName:[{value:r.lastName,disabled:!0},[h.s.required]],country:[{value:this.container.countries[0],disabled:!0},[h.s.required]],email:[{value:r.email,disabled:!0},[h.s.required]],dob:[{value:this.datePipe.transform(o,"dd-MMM-yyyy"),disabled:!0},[h.s.required]],phone:[{value:r.phone,disabled:!0},[h.s.required]]}),r.image&&this.pondFiles.push(r.image)},e=>{var r,o;this.loading=!1,w.a.fire("Oops...",null===(o=null===(r=null==e?void 0:e.error)||void 0===r?void 0:r.error)||void 0===o?void 0:o.message,"error")})}pondHandleInit(){console.log("FilePond has initialised",this.myPond)}pondHandleAddFile(e){console.log(this.firstFile),this.uploadedImage=e.file.getFileEncodeDataURL()}onUploadImage(){this.uploading=!0,this.apiService.patch("/api/v1/customers/update-avatar",{image:this.uploadedImage}).subscribe(e=>{this.uploading=!1,w.a.fire("Great!",null==e?void 0:e.message,"success")},e=>{var r,o;this.uploading=!1,w.a.fire("Oops...",null===(o=null===(r=null==e?void 0:e.error)||void 0===r?void 0:r.error)||void 0===o?void 0:o.message,"error")})}}return e.\u0275fac=function(r){return new(r||e)(m.Ob(h.e),m.Ob(u.a),m.Ob(i.f))},e.\u0275cmp=m.Ib({type:e,selectors:[["in-profile"]],viewQuery:function(e,r){if(1&e&&m.Jc(y,1),2&e){let e;m.tc(e=m.cc())&&(r.myPond=e.first)}},decls:2,vars:2,consts:[[3,"diameter",4,"ngIf"],["class","row m-2",4,"ngIf"],[3,"diameter"],[1,"row","m-2"],[1,"user-profile","col-12"],[1,"row"],[1,"col-3"],[1,"filepond",3,"files","options","oninit","onaddfile"],["myPond",""],[1,"col-3","d-flex"],[1,"btn","btn-danger","text-white","align-self-center",3,"disabled","click"],[1,"profile-form-container","col-12"],[3,"formGroup","ngSubmit"],[1,"form-group","col-md-6"],["for","firstName"],["formControlName","firstName","type","text","placeholder","Enter First Name",1,"form-control"],["for","lastName"],["formControlName","lastName","type","text","placeholder","Enter Last Name",1,"form-control"],["for","country"],["bindLabel","name","placeholder","Select Country","formControlName","country",3,"items","notFoundText"],["for","email"],["formControlName","email","type","text","placeholder","Enter email",1,"form-control"],[1,"form-text"],["for","dob"],["formControlName","dob","type","text","placeholder","Enter Date of Birth",1,"form-control"],["for","phone"],["formControlName","phone","type","text","placeholder","Enter phone",1,"form-control"]],template:function(e,r){1&e&&(m.Dc(0,T,1,1,"mat-spinner",0),m.Dc(1,N,40,6,"div",1)),2&e&&(m.lc("ngIf",r.loading),m.Cb(1),m.lc("ngIf",!r.loading))},directives:[i.n,l.b,s.b,h.t,h.n,h.h,h.c,h.m,h.f,U.a],styles:[""]}),e})();const F={oldPassword:{required:"Password is required",minlength:"Old Password must be at least 6 characters"},newPassword:{required:"Password is required",minlength:"New Password must be at least 6 characters"},confirmNewPassword:{required:"Confirm Password is required",minlength:"Confirm Password must be at least 6 characters",mustMatch:"Password  and Confirm passord fields do not match"}};let I={oldPassword:"",newPassword:"",confirmNewPassword:""};function O(e,r){if(1&e&&(m.Ub(0,"span"),m.Fc(1),m.Tb()),2&e){const e=m.fc();m.Cb(1),m.Gc(e.uiErrors.oldPassword)}}function x(e,r){if(1&e&&(m.Ub(0,"span"),m.Fc(1),m.Tb()),2&e){const e=m.fc();m.Cb(1),m.Gc(e.uiErrors.newPassword)}}function E(e,r){if(1&e&&(m.Ub(0,"span"),m.Fc(1),m.Tb()),2&e){const e=m.fc();m.Cb(1),m.Gc(e.uiErrors.confirmNewPassword)}}function S(e,r){1&e&&(m.Ub(0,"span"),m.Fc(1,"Update Password"),m.Tb())}function q(e,r){1&e&&m.Pb(0,"mat-spinner",14),2&e&&m.lc("diameter",30)}let k=(()=>{class e{constructor(e,r,o){this.fb=e,this.commonServices=r,this.apiService=o,this.errors=[],this.formErrors=I,this.uiErrors=I,this.validationMessages=F,this.submitting=!1}ngOnInit(){this.myForm=this.fb.group({oldPassword:[null,[h.s.required,h.s.minLength(6)]],newPassword:[null,[h.s.required,h.s.minLength(6)]],confirmNewPassword:[null,[h.s.required,h.s.minLength(6)]]},{validators:this.commonServices.mustMatch("newPassword","confirmNewPassword")})}onSubmit(){if(this.submitting=!0,this.myForm.invalid)return this.uiErrors=JSON.parse(JSON.stringify(this.formErrors)),this.errors=this.commonServices.findInvalidControlsRecursive(this.myForm),this.displayErrors(),void(this.submitting=!1);const e=JSON.parse(JSON.stringify(this.myForm.value));this.apiService.post("/api/v1/auth/customers/change-password",e).subscribe(e=>{this.submitting=!1,w.a.fire("Great!",null==e?void 0:e.message,"success")},e=>{var r,o;this.submitting=!1,w.a.fire("Oops...",null===(o=null===(r=null==e?void 0:e.error)||void 0===r?void 0:r.error)||void 0===o?void 0:o.message,"error")})}displayErrors(){Object.keys(this.formErrors).forEach(e=>{this.formErrors[e]=""}),Object.keys(this.errors).forEach(e=>{Object.keys(this.errors[e]).forEach(r=>{this.uiErrors[e]=F[e][r]})})}}return e.\u0275fac=function(r){return new(r||e)(m.Ob(h.e),m.Ob(p.a),m.Ob(u.a))},e.\u0275cmp=m.Ib({type:e,selectors:[["in-password"]],decls:26,vars:7,consts:[[1,"row","m-2"],[1,"password-form-container","col-12"],[3,"formGroup","ngSubmit"],[1,"row"],[1,"form-group","col-md-6"],["for","inputEmail4"],["formControlName","oldPassword","type","password","placeholder","Old Password",1,"form-control"],[4,"ngIf"],["for","inputAddress"],["formControlName","newPassword","type","password","placeholder","New Password",1,"form-control"],["formControlName","confirmNewPassword","type","password","placeholder","Old Password",1,"form-control"],[1,"form-group","col-md-12"],["mat-flat-button","","type","submit",1,"auth-button",3,"disabled"],[3,"diameter",4,"ngIf"],[3,"diameter"]],template:function(e,r){1&e&&(m.Ub(0,"div",0),m.Ub(1,"div",1),m.Ub(2,"form",2),m.bc("ngSubmit",function(){return r.onSubmit()}),m.Ub(3,"div",3),m.Ub(4,"div",4),m.Ub(5,"label",5),m.Fc(6,"Old Password"),m.Tb(),m.Pb(7,"input",6),m.Dc(8,O,2,1,"span",7),m.Tb(),m.Pb(9,"div",4),m.Ub(10,"div",4),m.Ub(11,"label",8),m.Fc(12,"New Password"),m.Tb(),m.Pb(13,"input",9),m.Dc(14,x,2,1,"span",7),m.Tb(),m.Pb(15,"div",4),m.Ub(16,"div",4),m.Ub(17,"label",8),m.Fc(18,"Confirm Password"),m.Tb(),m.Pb(19,"input",10),m.Dc(20,E,2,1,"span",7),m.Tb(),m.Pb(21,"div",4),m.Ub(22,"div",11),m.Ub(23,"button",12),m.Dc(24,S,2,0,"span",7),m.Dc(25,q,1,1,"mat-spinner",13),m.Tb(),m.Tb(),m.Tb(),m.Tb(),m.Tb(),m.Tb()),2&e&&(m.Cb(2),m.lc("formGroup",r.myForm),m.Cb(6),m.lc("ngIf",r.uiErrors.oldPassword),m.Cb(6),m.lc("ngIf",r.uiErrors.newPassword),m.Cb(6),m.lc("ngIf",r.uiErrors.confirmNewPassword),m.Cb(3),m.lc("disabled",r.submitting),m.Cb(1),m.lc("ngIf",!r.submitting),m.Cb(1),m.lc("ngIf",r.submitting))},directives:[h.t,h.n,h.h,h.c,h.m,h.f,i.n,l.b],styles:[""]}),e})();function D(e,r){1&e&&m.Pb(0,"in-profile")}function L(e,r){1&e&&m.Pb(0,"in-banking-details")}function M(e,r){1&e&&m.Pb(0,"in-kyc")}function G(e,r){1&e&&m.Pb(0,"in-documents")}function J(e,r){1&e&&m.Pb(0,"in-nok")}function R(e,r){1&e&&m.Pb(0,"in-password")}function j(e,r){1&e&&m.Pb(0,"in-socials")}const A=function(){return["/dashboard/index"]};let B=(()=>{class e{constructor(e,r,o,i,t){this.aRoute=e,this.router=r,this.apiService=o,this.appContext=i,this.commonServices=t,this.tabbedPages=[{page:null,url:"/dashboard/user/profile"},{page:"password",url:"/dashboard/user/password"}]}ngOnInit(){this.aRoute.paramMap.pipe(Object(b.a)(e=>(this.selectedIndex=this.tabbedPages.map(e=>e.page).indexOf(e.get("page")),this.commonServices.loading().next(!0),this.apiService.get("/customers/profile/fetch")))).subscribe(e=>{this.appContext.userInformation=e.data,this.commonServices.loading().next(!1)},e=>{})}setIndex(e){this.router.navigateByUrl(this.tabbedPages[e].url)}}return e.\u0275fac=function(r){return new(r||e)(m.Ob(c.a),m.Ob(c.c),m.Ob(u.a),m.Ob(f.a),m.Ob(p.a))},e.\u0275cmp=m.Ib({type:e,selectors:[["in-user"]],decls:30,vars:3,consts:[[1,"container-fluid","p-4"],[1,"row"],[1,"col-12"],[1,"text-dark","text-decoration-none",3,"routerLink"],[1,"page-title"],[1,"display-block"],[1,"col-md-12"],[1,"card"],[1,"card-body"],[3,"selectedIndex","selectedIndexChange"],["label","Profile"],[4,"matTabContent"],["label","Bank Details"],["label","KYC"],["label","Documents"],["label","Next Of Kin"],["label","Password"],["label","Social Profiles"]],template:function(e,r){1&e&&(m.Ub(0,"div",0),m.Ub(1,"div",1),m.Ub(2,"div",2),m.Ub(3,"a",3),m.Fc(4,"< Back"),m.Tb(),m.Ub(5,"div",4),m.Ub(6,"h1",5),m.Fc(7,"My Profile"),m.Tb(),m.Tb(),m.Ub(8,"div",4),m.Ub(9,"h3",5),m.Fc(10,"Account Settings"),m.Tb(),m.Tb(),m.Tb(),m.Tb(),m.Ub(11,"div",1),m.Ub(12,"div",6),m.Ub(13,"div",7),m.Ub(14,"div",8),m.Ub(15,"mat-tab-group",9),m.bc("selectedIndexChange",function(e){return r.setIndex(e)}),m.Ub(16,"mat-tab",10),m.Dc(17,D,1,0,"in-profile",11),m.Tb(),m.Ub(18,"mat-tab",12),m.Dc(19,L,1,0,"in-banking-details",11),m.Tb(),m.Ub(20,"mat-tab",13),m.Dc(21,M,1,0,"in-kyc",11),m.Tb(),m.Ub(22,"mat-tab",14),m.Dc(23,G,1,0,"in-documents",11),m.Tb(),m.Ub(24,"mat-tab",15),m.Dc(25,J,1,0,"in-nok",11),m.Tb(),m.Ub(26,"mat-tab",16),m.Dc(27,R,1,0,"in-password",11),m.Tb(),m.Ub(28,"mat-tab",17),m.Dc(29,j,1,0,"in-socials",11),m.Tb(),m.Tb(),m.Tb(),m.Tb(),m.Tb(),m.Tb(),m.Tb()),2&e&&(m.Cb(3),m.lc("routerLink",m.oc(2,A)),m.Cb(12),m.lc("selectedIndex",r.selectedIndex))},directives:[c.e,n.c,n.a,n.b,C,k],styles:[".link-pill-nav[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;padding-left:0;margin-bottom:10px}.link-pill-nav[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{font-style:normal;font-weight:800;font-size:13px;color:#1e1f20;line-height:50px;text-decoration:none;border-radius:10px;border:1px solid #0f242f;margin-right:15px;margin-bottom:10px;min-width:120px}.link-pill-nav[_ngcontent-%COMP%]   a.current[_ngcontent-%COMP%]{background-color:#ff652f;border-color:#ff652f;color:#fff}"]}),e})();const H=[{path:":page",component:B},{path:"",component:B}];let _=(()=>{class e{}return e.\u0275fac=function(r){return new(r||e)},e.\u0275mod=m.Mb({type:e}),e.\u0275inj=m.Lb({imports:[[c.f.forChild(H)],c.f]}),e})();var W=o("i2L+"),Y=o("LPyF"),z=o.n(Y),K=o("GUIp"),Q=o.n(K),X=o("gtPb"),Z=o.n(X),V=o("lnDc"),$=o.n(V),ee=o("NQWy"),re=o.n(ee),oe=o("m6bJ"),ie=o.n(oe),te=o("dOZY"),se=o.n(te);Object(t.registerPlugin)(z.a,Q.a,Z.a,$.a,re.a,ie.a,se.a);let ne=(()=>{class e{}return e.\u0275fac=function(r){return new(r||e)},e.\u0275mod=m.Mb({type:e}),e.\u0275inj=m.Lb({imports:[[i.c,_,W.a,s.a,l.a,n.d,a.a,d.b]]}),e})()}}]);