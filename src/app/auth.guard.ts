import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
 
  const router = new Router(); // Instantiate the Router

    if(localStorage.getItem('userToken')!==null){
      return true;
    }
    else {
      router.navigate(['/login']);
      return false;
    }

};
