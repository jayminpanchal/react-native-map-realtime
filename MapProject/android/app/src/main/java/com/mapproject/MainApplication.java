package com.mapproject;

import android.app.Application;

import android.support.annotation.Nullable;

import com.facebook.react.ReactApplication;
import com.oblador.vectoricons.VectorIconsPackage;
import com.reactnativenavigation.NavigationApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends NavigationApplication{

      @Override
      public boolean isDebug() {
          return BuildConfig.DEBUG;
      }

      @Nullable
      @Override
  public List<ReactPackage> createAdditionalReactPackages()
  {
          return null;
      }

}
