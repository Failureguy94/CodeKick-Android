package com.codekick.app.ui.screens.dashboard;

import com.codekick.app.data.repository.AuthRepository;
import com.codekick.app.data.repository.LearningRepository;
import dagger.internal.DaggerGenerated;
import dagger.internal.Factory;
import dagger.internal.Provider;
import dagger.internal.QualifierMetadata;
import dagger.internal.ScopeMetadata;
import javax.annotation.processing.Generated;

@ScopeMetadata
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
public final class DashboardViewModel_Factory implements Factory<DashboardViewModel> {
  private final Provider<LearningRepository> learningRepositoryProvider;

  private final Provider<AuthRepository> authRepositoryProvider;

  public DashboardViewModel_Factory(Provider<LearningRepository> learningRepositoryProvider,
      Provider<AuthRepository> authRepositoryProvider) {
    this.learningRepositoryProvider = learningRepositoryProvider;
    this.authRepositoryProvider = authRepositoryProvider;
  }

  @Override
  public DashboardViewModel get() {
    return newInstance(learningRepositoryProvider.get(), authRepositoryProvider.get());
  }

  public static DashboardViewModel_Factory create(
      Provider<LearningRepository> learningRepositoryProvider,
      Provider<AuthRepository> authRepositoryProvider) {
    return new DashboardViewModel_Factory(learningRepositoryProvider, authRepositoryProvider);
  }

  public static DashboardViewModel newInstance(LearningRepository learningRepository,
      AuthRepository authRepository) {
    return new DashboardViewModel(learningRepository, authRepository);
  }
}
