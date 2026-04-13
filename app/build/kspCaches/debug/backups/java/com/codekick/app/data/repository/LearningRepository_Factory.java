package com.codekick.app.data.repository;

import dagger.internal.DaggerGenerated;
import dagger.internal.Factory;
import dagger.internal.QualifierMetadata;
import dagger.internal.ScopeMetadata;
import javax.annotation.processing.Generated;

@ScopeMetadata("javax.inject.Singleton")
@QualifierMetadata
@DaggerGenerated
@Generated(
    value = "dagger.internal.codegen.ComponentProcessor",
    comments = "https://dagger.dev"
)
@SuppressWarnings({
    "unchecked",
    "rawtypes",
    "KotlinInternal",
    "KotlinInternalInJava",
    "cast",
    "deprecation",
    "nullness:initialization.field.uninitialized"
})
public final class LearningRepository_Factory implements Factory<LearningRepository> {
  @Override
  public LearningRepository get() {
    return newInstance();
  }

  public static LearningRepository_Factory create() {
    return InstanceHolder.INSTANCE;
  }

  public static LearningRepository newInstance() {
    return new LearningRepository();
  }

  private static final class InstanceHolder {
    static final LearningRepository_Factory INSTANCE = new LearningRepository_Factory();
  }
}
