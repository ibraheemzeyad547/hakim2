import { Component, OnInit } from '@angular/core';
import {LoadingController, MenuController, NavController, Platform, ToastController} from "@ionic/angular";
import {Storage} from "@ionic/storage";
import {UsersService} from "../../services/users.service";
import { Network } from '@ionic-native/network/ngx';

@Component({
  selector: 'app-forgotpasssword',
  templateUrl: './forgotpasssword.page.html',
  styleUrls: ['./forgotpasssword.page.scss'],
})
export class ForgotpassswordPage implements OnInit {
  number:any;
  errorNumber:any="";
  isErrorNumber:any = 1;

  isdisabled:boolean=true;
  backToPage:any;
  returnData:any;
  operationResult:any;
  message:any;
  loadingShow:any = 0;
  returnFullName:any;
  returnNumber:any;
  constructor(private network:Network,private menu:MenuController,private storage: Storage,private platform: Platform,private navCtrl: NavController,private usersService:UsersService,private toastCtrl: ToastController,private loading: LoadingController) {
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      this.storage.set('thisPageReturn','forgotpasssword');
      this.storage.set('internetBack','0');
      this.navCtrl.navigateRoot("/errors");
    });
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.navCtrl.navigateRoot("/login");
    });
  }
  async ngOnInit() {
    this.backToPage = await this.storage.get('internetBack');
    if(this.backToPage !='1'){
      this.navCtrl.navigateRoot("/errors");
    }
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      this.storage.set('thisPageReturn','forgotpasssword');
      this.storage.set('internetBack','0');
      this.navCtrl.navigateRoot("/errors");
    });
  }
  checkNumber(event){
    this.errorNumber = "succsessFiled";
    this.isErrorNumber = 1;
    this.number = event;
    if(this.number == "" || this.number == undefined){
      this.errorNumber = "errorFiled";
      this.isErrorNumber = 0;
    }
    this.isEnterAllValues();
  }
  isEnterAllValues(){
    if(this.number != undefined && this.number != ""){
      this.isdisabled = true;
    }
  }
  async forgotPassword(){
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      this.storage.set('thisPageReturn','forgotpasssword');
      this.storage.set('internetBack','0');
      this.navCtrl.navigateRoot("/errors");
    });
    if((this.number == undefined || this.number == "")){
      this.errorNumber = "errorFiled";
      this.isErrorNumber = 0;
      this.isdisabled = false;
      return false;
    }
    if(this.number == undefined || this.number == ""){
      this.errorNumber = "errorFiled";
      this.isErrorNumber = 0;
      this.isdisabled = false;
      return false;
    }
    this.loadingShow = 1;
    if(this.number != undefined ){
      this.usersService.forgotPassword(this.number).then(data=>{
        this.returnData = data;
        this.operationResult = this.returnData.Error.ErrorCode;
        if(this.operationResult==1){
          this.message = "???? ?????????? ?????????? ?????????? ???????????? ?????? ??????????";
          this.displayResult(this.message);
          this.loadingShow = 0;
          this.navCtrl.navigateRoot("/login");
        }else if(this.operationResult==2){
          this.message = "???? ?????? ?????????? ?????????? ???????? ???????????? ??????????...???????????????? ??????????";
          this.displayResult(this.message);
          this.loadingShow = 0;
        }else if(this.operationResult==3){
          this.message = "???? ?????? ?????????? ?????????? ???????? ???????????? ??????????...???????? ?????? ????????";
          this.displayResult(this.message);
          this.loadingShow = 0;
        }else{
          this.message = "???? ?????? ?????????? ?????????? ???????? ???????????? ??????????...?????? ???? ?????????????????? ??????????????";
          this.displayResult(this.message);
          this.loadingShow = 0;
        }
      }).catch(e=>{
        this.message = "???? ?????? ?????????? ?????????? ???????? ???????????? ??????????...???????? ?????? ????????";
        this.displayResult(this.message);
        this.loadingShow = 0;
      })
      this.isdisabled = true;
    }
  }
  async displayResult(message){
    let toast = await this.toastCtrl.create({
      message: message,
      duration: 5000,
      position: 'bottom',
      cssClass:"toastStyle",
      color:""
    });
    await toast.present();
  }
  functionGoToHome(){
    this.navCtrl.navigateRoot("/home");
  }
  functionGoToStores(){
    this.navCtrl.navigateRoot("/stores");
  }
  functionGoToShoppingcart(){
    this.navCtrl.navigateRoot("/shoppingcart");
  }
  functionOpenMenue(){
    this.menu.enable(true,"main-content");
    this.menu.open("main-content");
  }
}
